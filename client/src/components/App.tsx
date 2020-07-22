import * as React from 'react';
import ConfirmationPage from './ConfirmationPage';
import GeneralInfo from './GeneralInfo';
import GuestInfo from './GuestInfo';
import RegionSelection from './RegionSelection';
import ReservationSlots from './ReservationSlots';
import { DiningRegion, SearchEntry, DaySlots } from '../types';
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
  dateSelected: string
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
      timeSelectedId: 0,
      dateSelected: ""
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectSlot = this.handleSelectSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(search: SearchEntry) {
    console.log(search);
    matchRegions(search.partySize, search.hasSmoker, search.hasChildren)
      .then((data: Array<DiningRegion>) => {
        console.log(data, data.length);
        this.setState({
          availableRegions: data,
          matched: true,
          search,
          regionSelectedId: data.length > 0 ? data[0].id : 0,
          regionSelectedName: data.length > 0 ? data[0].region_name : "",
          timeSelectedId: 0,
          dateSelected: ""
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
    if (this.state.timeSelectedId > 0) newReservationSlots[this.state.dateSelected][this.state.timeSelectedId-1].selected = false;
    newReservationSlots[date][timeId-1].selected = true;
    this.setState({
      reservationSlots: newReservationSlots,
      dateSelected: date,
      timeSelectedId: timeId,
    });
  }

  updateSlots(region_id: number, region_name: string) {
    getSlots(region_id)
      .then((data: DaySlots) => {
        this.setState({
          reservationSlots: data,
          regionSelectedId: region_id,
          regionSelectedName: region_name,
          timeSelectedId: 0,
          dateSelected: ""
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <GeneralInfo/>
        <GuestInfo validator={new SimpleReactValidator} handleSubmit={this.handleSubmit}/>
        {this.state.matched && <RegionSelection availableRegions={this.state.availableRegions} handleSelectChange={this.handleSelectChange}/>}
        {this.state.regionSelectedId > 0 && <ReservationSlots regionId={this.state.regionSelectedId} regionName={this.state.regionSelectedName} reservationSlots={this.state.reservationSlots} handleSelectSlot={this.handleSelectSlot}/>}
        {this.state.timeSelectedId > 0 && <ConfirmationPage/>}
      </div>
    );
  }
}

export default App;
