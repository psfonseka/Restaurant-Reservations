import * as React from 'react';
import GeneralInfo from './GeneralInfo';

interface Props {

}

interface State {

}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="app">
        <GeneralInfo/>
      </div>
    );
  }
}

export default App;
