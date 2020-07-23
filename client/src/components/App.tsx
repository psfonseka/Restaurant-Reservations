import * as React from 'react';
import ConfirmationPage from './ConfirmationPage';
import GeneralInfo from './GeneralInfo';
import GuestInfo from './GuestInfo';
import RegionSelection from './RegionSelection';
import ReservationSlots from './ReservationSlots';
import { DiningRegion, SearchEntry, DaySlots, FullInfo } from '../types';
import SimpleReactValidator from 'simple-react-validator';
import matchRegions from '../helpers/matchRegions';
import getSlots from '../helpers/getSlots';

interface Props {

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

    this.confirmReservation = this.confirmReservation.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  confirmReservation() {
    console.log("Confirmation");
    this.setState({
      info: Object.assign({}, this.state.info, {confirmed: true})
    });
  }

  handleSubmit(search: SearchEntry) {
    console.log(search);
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
    if (this.state.timeSelectedId > -1) newReservationSlots[this.state.dateSelected][this.state.timeSelectedId].selected = false;
    newReservationSlots[date][timeId].selected = true;
    const info = Object.assign({}, this.state.info, {
      reservationDate: date,
      reservationTime: this.state.reservationSlots[date][timeId].time
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
