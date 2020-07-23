import * as React from 'react';
import { FullInfo } from '../types';

interface Props {
  info: Partial<FullInfo>,
  confirmReservation: () => void;
}

const ConfirmationPage = (props: Props) => {
  return (
    <div className="confirmationPage">
      {props.info.confirmed && 
      <h3>Thank you! You can view your reservation below:</h3>}
      <h2>Confirmation</h2>
      <div>Reservation Time: {props.info.reservationTime}</div>
      <div>Reservation Date: {props.info.reservationDate}</div>
      <div>Guest Name: {props.info.guestInfo?.fullName}</div>
      <div>E-mail: {props.info.guestInfo?.email}</div>
      <div>Phone Number: {props.info.guestInfo?.phoneNumber}</div>
      <div>Dining Region: {props.info.regionInfo?.region_name}</div>
      <div>Number of Guests: {props.info.guestInfo?.partySize}</div>
      {props.info.guestInfo?.hasChildren && 
      <div>Number of Children: {props.info.guestInfo.childrenNumber}</div>}
      {props.info.guestInfo?.hasBirthday && 
      <div>Birthday Name: {props.info.guestInfo.birthdayName}</div>}
      {!props.info.confirmed && 
      <button onClick={props.confirmReservation}>Confirm Reservation</button>}
    </div>
  )
};

export default ConfirmationPage;