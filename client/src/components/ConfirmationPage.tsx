import * as React from 'react';
import { FullInfo } from '../types';

interface Props {
  info: Partial<FullInfo>
}

const ConfirmationPage = (props: Props) => {
  console.log(props.info);
  return (
    <div className="confirmationPage">
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
    </div>
  )
};

export default ConfirmationPage;