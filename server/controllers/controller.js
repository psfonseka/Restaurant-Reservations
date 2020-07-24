const db = require('../../db/db');

module.exports = {
  confirmReservation: (req, res) => { //Adds reservation to DB and once successful, emits reservation data to all users
    const body = req.body
    const guest = body.guestInfo;
    const birthday = guest.hasBirthday ? [`birthday, birthday_name`, `TRUE, '${guest.birthdayName}'`] : [`birthday`, `FALSE`];
    const children = guest.hasChildren ? [`children, number_of_children`,`TRUE, ${guest.childrenNumber}`] : [`children`, `FALSE`];
    db.any(`INSERT INTO reservations (region_id, reservation_time, reservation_date, full_name, email, phone_number, party_size, ${birthday[0]}, ${children[0]}, smoking) 
      VALUES (${body.regionInfo.id}, '${body.reservationTime}', '${body.reservationDate}', '${guest.fullName}', '${guest.email}', '${guest.phoneNumber}', ${guest.partySize}, ${birthday[1]}, ${children[1]}, ${guest.hasSmoker});`)      
      .then(() => {
        res.send("Confirmed Reservation");
      })
      .then(() => {
        req.io.emit('reservation', {
          regionId: body.regionInfo.id,
          reservationTime: body.reservationTime,
          reservationDate: body.reservationDate,
          reservationTimeId: body.reservationTimeId
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      })
  },
  matchRegions: (req, res) => { //Checks user info with region info on DB to find what dining regions the user is eligible for 
    const smoker = (req.body.smoking) ? ' AND smoking_allowed = TRUE' : '';
    const children = (req.body.children) ? ' AND children_allowed = TRUE' : '';
    db.any(`SELECT id, region_name FROM regions WHERE ${req.body.partySize} <= max_size` + smoker + children)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      })
  },
  getSlots: (req, res) => { //Gets the reservations slots for a region and adds info about whether there is already existing reservation for the slot
    const id = req.params.id;
    db.any(`SELECT timeslots.time_string, dates.date, 
      CASE WHEN reservations.reservation_time = timeslots.timeslot 
      AND reservations.reservation_date = dates.date 
      THEN TRUE ELSE FALSE END as taken 
      FROM timeslots CROSS JOIN dates 
      LEFT JOIN reservations ON reservations.reservation_time = timeslots.timeslot 
      AND reservations.reservation_date = dates.date
      AND reservations.region_id = ${id};`)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  }
};