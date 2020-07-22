import * as React from 'react';
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
  reservationSlots: DaySlots
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
      reservationSlots: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSubmit(search: SearchEntry) {
    console.log(search);
    matchRegions(search.partySize, search.hasSmoker, search.hasChildren)
      .then((data: Array<DiningRegion>) => {
        this.setState({
          availableRegions: data,
          matched: true,
          search,
          regionSelectedId: data[0].id || 0,
          regionSelectedName: data[0].region_name || ""
        }, () => {
          if (this.state.regionSelectedId > 0) this.updateSlots(this.state.regionSelectedId, this.state.regionSelectedName);
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  updateSlots(region_id: number, region_name: string) {
    getSlots(region_id)
      .then((data: DaySlots) => {
        this.setState({
          reservationSlots: data,
          regionSelectedId: region_id,
          regionSelectedName: region_name
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

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <GeneralInfo/>
        <GuestInfo validator={new SimpleReactValidator} handleSubmit={this.handleSubmit}/>
        {this.state.matched && <RegionSelection availableRegions={this.state.availableRegions} handleSelectChange={this.handleSelectChange}/>}
        {this.state.regionSelectedId > 0 && <ReservationSlots/>}
      </div>
    );
  }
}

export default App;
