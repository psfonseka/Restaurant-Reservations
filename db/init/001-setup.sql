-- Spent probably too much time thinking about what might be an optimal schema
-- Considered creating reservation bookings beforehand for every timestamp and region combination
-- That would be so time availability could be looked up more efficiently with indexing, 
-- But that might be overkill, especially since I don't know how much it would improve queries anyway
-- We'll stick with Finding availabilities based on what time/region combinations are not booked

CREATE TABLE timeslots (
  timeslot TIME PRIMARY KEY,
  time_string TEXT NOT NULL
);

CREATE TABLE dates (
  date DATE PRIMARY KEY
);

CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  region_name TEXT NOT NULL,
  max_size INT NOT NULL,
  children_allowed BOOLEAN NOT NULL,
  smoking_allowed BOOLEAN NOT NULL
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  region_id INT NOT NULL,
  reservation_time TIME NOT NULL,
  reservation_date DATE NOT NULL,
  CONSTRAINT fk_reservation_region FOREIGN KEY (region_id) REFERENCES regions(id)
);

CREATE TABLE confirmations (
  id SERIAL PRIMARY KEY,
  reservation_id INT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  party_size INT NOT NULL,
  birthday BOOLEAN NOT NULL,
  birthday_name TEXT,
  CONSTRAINT fk_confirmation_reservation FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);