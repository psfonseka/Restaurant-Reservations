const db = require('../../db/db');

db.any('select timeslots.time_string, sub.date from timeslots right join (select timeslot, date from timeslots, dates except select reservation_time, reservation_date from reservations where region_id = 2) as sub on timeslots.timeslot = sub.timeslot;')
  .then((data) => {
    console.log(data.length);
  })
  .catch((err) => {
    console.log(err);
  });