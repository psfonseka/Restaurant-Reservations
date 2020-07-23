const db = require('../../db/db');

module.exports = {
  confirmReservation: (req, res) => {
    console.log(req.body);
    res.send("confirmed");
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