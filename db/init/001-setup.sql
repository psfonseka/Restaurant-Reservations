-- After some planning about what I wanted for the user experience along with changes through steps of 
-- creating the application, I figured that this was a pretty good schema for setting up the reservation 
-- app in the style of a movie seat reservation app

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
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  party_size INT NOT NULL,
  birthday BOOLEAN NOT NULL,
  birthday_name TEXT,
  children BOOLEAN NOT NULL,
  number_of_children INT,
  smoking BOOLEAN NOT NULL,
  CONSTRAINT fk_reservation_region FOREIGN KEY (region_id) REFERENCES regions(id),
  CONSTRAINT fk_reservation_time FOREIGN KEY (reservation_time) REFERENCES timeslots(timeslot),
  CONSTRAINT fk_reservation_date FOREIGN KEY (reservation_date) REFERENCES dates(date),
  UNIQUE (region_id, reservation_time, reservation_date)
);