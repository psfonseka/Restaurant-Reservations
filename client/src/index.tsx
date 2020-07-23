import * as React from 'react';
import * as ReactDOM from "react-dom";
import socket from './helpers/socket';

import App from './components/App';

const mountNode = document.getElementById("app");
ReactDOM.render(<App socket={socket}/>, mountNode);