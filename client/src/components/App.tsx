import * as React from 'react';
import GeneralInfo from './GeneralInfo';
import GuestInfo from './GuestInfo';
import { SearchEntry } from '../types';
import SimpleReactValidator from 'simple-react-validator';


interface Props {

}

interface State {

}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(search: SearchEntry) {
    console.log(search);
  }

  render() {
    return (
      <div className="app">
        <GeneralInfo/>
        <GuestInfo validator={new SimpleReactValidator} handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
