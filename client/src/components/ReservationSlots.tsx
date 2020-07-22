import * as React from 'react';
import { DaySlots } from '../types';

interface Props {
  regionId: number,
  regionName: string,
  reservationSlots: DaySlots
}

const ReservationSlots = (props: Props) => {
  return (
    <div className="reservationSlots">
      <h2>{props.regionName} Reservation Slots</h2>
    </div>
  )
};

export default ReservationSlots;
