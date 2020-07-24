import * as React from 'react';
import ConfirmationPage from './ConfirmationPage';
import GeneralInfo from './GeneralInfo';
import GuestInfo from './GuestInfo';
import RegionSelection from './RegionSelection';
import ReservationSlots from './ReservationSlots';
import { DiningRegion, SearchEntry, DaySlots, FullInfo, ReservationInfo, SocketHelper } from '../types';
import SimpleReactValidator from 'simple-react-validator';
import confirmReservation from '../helpers/confirmReservation';
import getSlots from '../helpers/getSlots';
import matchRegions from '../helpers/matchRegions';

interface Props {
  socketContainer: Partial<SocketHelper>
}

interface State {
  availableRegions: Array<DiningRegion>,
  matched: boolean,
  search: Partial<SearchEntry>
  regionSelectedId: number,
  regionSelectedName: string,
  reservationSlots: DaySlots,
  timeSelectedId: number,
  dateSelected: string,
  info: Partial<FullInfo>
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      availableRegions: [],
      matched: false, 
      search: {},
      regionSelectedId: 0,
      regionSelectedName: "",
      reservationSlots: {},
      timeSelectedId: -1,
      dateSelected: "",
      info: {}
    };

    this.checkReservation = this.checkReservation.bind(this); //Runs whenever the API websocket sends info about a completed reservation by another user
    this.confirmReservation = this.confirmReservation.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this); //For region selection, makes an API request to get reservation slots for that region
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); //For the original search that sends an API request to find what dining regions the user is eligible for
  }

  componentDidMount() {
    this.props.socketContainer.realTimeUpdate = (reservation: ReservationInfo) => {
      this.checkReservation(reservation);
    };
  }

  checkReservation(reservation: ReservationInfo) {
    if (this.state.info.confirmed || !this.state.matched || this.state.regionSelectedId !== reservation.regionId) return;
    //Could have done it in a much cleaner way by just having it make another API request for new reservation slots,
    //But decided to do it this way in just giving the work to front-end based on what slot was confirmed to be taken
    const newReservationDay = Object.assign({}, this.state.reservationSlots[reservation.reservationDate]);
    newReservationDay[reservation.reservationTimeId].taken = true;
    const newReservationSlots = Object.assign({}, this.state.reservationSlots);
    //Necessary for turning newReservationDay into an array
    newReservationSlots[reservation.reservationDate] = Object.keys(newReservationDay).map((idx: any) => {
      return {
        time: newReservationDay[idx].time,
        taken: newReservationDay[idx].taken,
        selected: newReservationDay[idx].selected
      }
    });
    if (this.state.dateSelected === reservation.reservationDate && this.state.timeSelectedId === reservation.reservationTimeId) {
      alert("Sorry, someone has just taken your reservation slot!");
      newReservationSlots[reservation.reservationDate][reservation.reservationTimeId].selected = false;
      this.setState({
        reservationSlots: newReservationSlots,
        timeSelectedId: -1,
        dateSelected: "",
      });
    } else {
      this.setState({
        reservationSlots: newReservationSlots
      });
    }
  }

  confirmReservation() {
    this.setState({
      info: Object.assign({}, this.state.info, {confirmed: true}) //Optimistically say it's confirmed so websocket doesn't interfere
    }, () => {
      confirmReservation(this.state.info)
      .then((response: string) => {
        console.log(response)
      })
      .catch((err: any) => {
        this.setState({
          info: Object.assign({}, this.state.info, {confirmed: false})
        });
        console.log(err);
        alert("Sorry, we could not confirm due to someone else just taking the reservation slot or a problem with the server");
      });
    });
  }

  handleSubmit(search: SearchEntry) {
    matchRegions(search.partySize, search.hasSmoker, search.hasChildren)
      .then((data: Array<DiningRegion>) => {
        this.setState({
          availableRegions: data,
          matched: true,
          search,
          regionSelectedId: data.length > 0 ? data[0].id : 0,
          regionSelectedName: data.length > 0 ? data[0].region_name : "",
          timeSelectedId: -1,
          dateSelected: "",
          info: {
            guestInfo: search
          }
        }, () => {
          //Immediately calls the API request for slots for the first eligible dining region
          if (this.state.regionSelectedId > 0) this.updateSlots(this.state.regionSelectedId, this.state.regionSelectedName);
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const region_id = parseInt(event.target.value);
    const region_name = event.target.options[event.target.options.selectedIndex].text;
    this.updateSlots(region_id, region_name);
  }

  handleSelectSlot(date: string, timeId: number) {
    let newReservationSlots = Object.assign({}, this.state.reservationSlots);
    //Check if there is an already selected slot then unselect it 
    if (this.state.timeSelectedId > -1) newReservationSlots[this.state.dateSelected][this.state.timeSelectedId].selected = false;
    newReservationSlots[date][timeId].selected = true;
    const info = Object.assign({}, this.state.info, {
      reservationDate: date,
      reservationTime: this.state.reservationSlots[date][timeId].time,
      reservationTimeId: timeId
    });
    this.setState({
      reservationSlots: newReservationSlots,
      dateSelected: date,
      timeSelectedId: timeId,
      info
    });
  }

  updateSlots(region_id: number, region_name: string) {
    getSlots(region_id)
      .then((data: DaySlots) => {
        const info = Object.assign({}, this.state.info, {
          regionInfo: {
            region_name,
            id: region_id
          }
        })
        this.setState({
          reservationSlots: data,
          regionSelectedId: region_id,
          regionSelectedName: region_name,
          timeSelectedId: -1,
          dateSelected: "",
          info
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app">
        <GeneralInfo/>
        {!this.state.info.confirmed && <GuestInfo validator={new SimpleReactValidator} handleSubmit={this.handleSubmit}/>}
        {this.state.matched && !this.state.info.confirmed && <RegionSelection availableRegions={this.state.availableRegions} handleSelectChange={this.handleSelectChange}/>}
        {this.state.regionSelectedId > 0 && !this.state.info.confirmed && <ReservationSlots regionId={this.state.regionSelectedId} regionName={this.state.regionSelectedName} reservationSlots={this.state.reservationSlots} handleSelectSlot={this.handleSelectSlot}/>}
        {this.state.timeSelectedId > -1 && <ConfirmationPage info={this.state.info} confirmReservation={this.confirmReservation}/>}
      </div>
    );
  }
}

export default App;
