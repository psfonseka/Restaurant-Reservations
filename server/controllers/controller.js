const db = require('../../db/db');

//db.any('select timeslots.time_string, sub.date from timeslots right join (select timeslot, date from timeslots, dates except select reservation_time, reservation_date from reservations where region_id = 2) as sub on timeslots.timeslot = sub.timeslot;')
db.any('SELECT timeslots.time_string, dates.date, CASE WHEN reservations.reservation_time = timeslots.timeslot AND reservations.reservation_date = dates.date THEN TRUE ELSE FALSE END as taken FROM timeslots CROSS JOIN dates LEFT JOIN reservations ON reservations.reservation_time = timeslots.timeslot AND reservations.reservation_date = dates.date;')  
  .then((data) => {
    console.log(data.length);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
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
  }
};