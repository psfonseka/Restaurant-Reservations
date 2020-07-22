import * as React from 'react';
import { DaySlots } from '../types';

interface Props {
  regionId: number,
  regionName: string,
  reservationSlots: DaySlots
}

const ReservationSlots = (props: Props) => {
  console.log(Object.keys(props.reservationSlots));
  return (
    <div className="reservationSlots">
      <h2>{props.regionName} Reservation Slots</h2>
      <div className="dates">
        {Object.keys(props.reservationSlots).map((date) => {
          return <div key={date}>{date}</div>
        })}
      </div>
      <div className="slotsContainer">
        {Object.keys(props.reservationSlots).map((date) => {
          return props.reservationSlots[date].map((slot) => {
          return <div className={slot.taken ? "takenSlot" : "slot"} key={date + ": " + slot.time}>{slot.time}</div>
          })
        })}
      </div>
    </div>
  )
};

export default ReservationSlots;
