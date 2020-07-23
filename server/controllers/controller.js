const db = require('../../db/db');

module.exports = {
  confirmReservation: (req, res) => {
    console.log(req.body);
    const body = req.body
    const region_id = body.regionInfo.id;
    const reservation_time = body.reservationTime;
    const reservation_date = body.reservationDate;
    console.log(region_id, reservation_time, reservation_date);
    const guest = body.guestInfo;
    const birthday = guest.hasBirthday ? [`birthday, birthday_name`, `TRUE, '${guest.birthdayName}'`] : [`birthday`, `FALSE`];
    const children = guest.hasChildren ? [`children, number_of_children`,`TRUE, ${guest.childrenNumber}`] : [`children`, `FALSE`];
    db.any(`INSERT INTO reservations (region_id, reservation_time, reservation_date) 
      VALUES (${region_id}, '${reservation_time}', '${reservation_date}') RETURNING id;`)
      .then((reservation_id) => {
        const id = reservation_id[0].id;
        console.log(id);
        return db.any(`INSERT INTO confirmations (reservation_id, full_name, email, phone_number, party_size, ${birthday[0]}, ${children[0]}, smoking) 
          VALUES (${id}, '${guest.fullName}', '${guest.email}', '${guest.phoneNumber}', ${guest.partySize}, ${birthday[1]}, ${children[1]}, ${guest.hasSmoker});`)
      })
      .then((data) => {
        res.send("Confirmed Reservation");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      })
  },
  matchRegions: (req, res) => {
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
  getSlots: (req, res) => {
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