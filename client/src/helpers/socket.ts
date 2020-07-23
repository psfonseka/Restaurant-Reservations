import * as io from 'socket.io-client';
import { SocketHelper, ReservationInfo } from '../types';

const socketHelper = <Partial<SocketHelper>>{
  socket: io(location.origin)
};
const socket = socketHelper.socket;
socket.on('reservation', (reservation: ReservationInfo) => {
  if (socketHelper.realTimeUpdate) socketHelper.realTimeUpdate(reservation);
});

export default socketHelper;