import * as io from 'socket.io-client';
import { SocketHelper, ReservationInfo } from '../types';

//Initialize it as a partial, so the App can initialize the function that is invoked when the socket receives reservation data,
//without the App needing to pass props down to it
const socketHelper = <Partial<SocketHelper>>{
  socket: io(location.origin)
};
const socket = socketHelper.socket;
socket.on('reservation', (reservation: ReservationInfo) => {
  if (socketHelper.realTimeUpdate) socketHelper.realTimeUpdate(reservation);
});

export default socketHelper;