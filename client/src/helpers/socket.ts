import * as io from 'socket.io-client';

const socket = io(location.origin);

export default socket;