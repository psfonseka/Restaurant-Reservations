import * as React from 'react';
import { DaySlots } from '../types';

interface Props {
  regionId: number,
  regionName: string,
  reservationSlots: DaySlots,
  handleSelectSlot: (date: string, timeId: number) => void;
}

const ReservationSlots = (props: Props) => {
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
          return props.reservationSlots[date].map((slot, timeId) => {
          let cName = "slot";
          if (slot.taken) cName = "takenSlot";
          if (slot.selected) cName = "selectedSlot";
          return <div onClick={(e) => {if (!slot.taken) props.handleSelectSlot(date, timeId)}} className={cName} key={date + ": " + slot.time}>{slot.time}</div>
          })
        })}
      </div>
    </div>
  )
};

export default ReservationSlots;
