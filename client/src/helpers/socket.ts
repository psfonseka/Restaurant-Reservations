import * as io from 'socket.io-client';
import { SocketHelper } from '../types';

const socketHelper = <Partial<SocketHelper>>{
  socket: io(location.origin)
};
const socket = socketHelper.socket;
socket.on('test', (test: string) => {
  socketHelper.functionTest(test);
})

export default socketHelper;