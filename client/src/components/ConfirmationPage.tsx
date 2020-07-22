import * as React from 'react';
import { State } from '../types';

interface Props {
  appState: State
}

const ConfirmationPage = (props: Props) => {
  console.log(props.appState);
  return (
    <div>
      <h2>Confirmation</h2>
    </div>
  )
};

export default ConfirmationPage;