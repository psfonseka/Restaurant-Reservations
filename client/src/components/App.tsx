import * as React from 'react';
import GeneralInfo from './GeneralInfo';
import GuestInfo from './GuestInfo';
import RegionSelection from './RegionSelection';
import { DiningRegion, SearchEntry } from '../types';
import SimpleReactValidator from 'simple-react-validator';
import matchRegions from '../helpers/matchRegions';

interface Props {

}

interface State {
  availableRegions: Array<DiningRegion>,
  matched: boolean,
  search: Partial<SearchEntry>
  regionSelected: number
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      availableRegions: [],
      matched: false, 
      search: {},
      regionSelected: 0
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
          search
        });
      })
      .catch((err: any) => {
        console.log(err);
      })
  }

  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value)
  }

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <GeneralInfo/>
        <GuestInfo validator={new SimpleReactValidator} handleSubmit={this.handleSubmit}/>
        {this.state.matched && <RegionSelection availableRegions={this.state.availableRegions} handleSelectChange={this.handleSelectChange}/>}
      </div>
    );
  }
}

export default App;
