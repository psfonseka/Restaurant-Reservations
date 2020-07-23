INSERT INTO timeslots (timeslot, time_string) VALUES ('6:00 PM', '6:00 PM');
INSERT INTO timeslots (timeslot, time_string) VALUES ('6:30 PM', '6:30 PM');
INSERT INTO timeslots (timeslot, time_string) VALUES ('7:00 PM', '7:00 PM');
INSERT INTO timeslots (timeslot, time_string) VALUES ('7:30 PM', '7:30 PM');
INSERT INTO timeslots (timeslot, time_string) VALUES ('8:00 PM', '8:00 PM');
INSERT INTO timeslots (timeslot, time_string) VALUES ('8:30 PM', '8:30 PM');
INSERT INTO timeslots (timeslot, time_string) VALUES ('9:00 PM', '9:00 PM');
INSERT INTO timeslots (timeslot, time_string) VALUES ('9:30 PM', '9:30 PM');
INSERT INTO timeslots (timeslot, time_string) VALUES ('10:00 PM', '10:00 PM');

INSERT INTO dates (date) VALUES ('07-24-2020');
INSERT INTO dates (date) VALUES ('07-25-2020');
INSERT INTO dates (date) VALUES ('07-26-2020');
INSERT INTO dates (date) VALUES ('07-27-2020');
INSERT INTO dates (date) VALUES ('07-28-2020');
INSERT INTO dates (date) VALUES ('07-29-2020');
INSERT INTO dates (date) VALUES ('07-30-2020');
INSERT INTO dates (date) VALUES ('07-31-2020');

INSERT INTO regions (region_name, max_size, children_allowed, smoking_allowed) VALUES ('Main Hall', 12, TRUE, FALSE);
INSERT INTO regions (region_name, max_size, children_allowed, smoking_allowed) VALUES ('Bar', 4, FALSE, FALSE);
INSERT INTO regions (region_name, max_size, children_allowed, smoking_allowed) VALUES ('Riverside', 8, TRUE, FALSE);
INSERT INTO regions (region_name, max_size, children_allowed, smoking_allowed) VALUES ('Riverside (smoking allowed)', 6, FALSE, TRUE);

INSERT INTO reservations (region_id, reservation_time, reservation_date, full_name, email, phone_number, party_size, birthday, birthday_name, children, number_of_children, smoking) VALUES (2, '9:30 PM', '07-27-2020', 'Alex Turner', 'ArcticMonkeys@gmail.com', '824-281-0193', 10, TRUE, 'Matt Helders', TRUE, 3, FALSE);
INSERT INTO reservations (region_id, reservation_time, reservation_date, full_name, email, phone_number, party_size, birthday, children, smoking) VALUES (4, '9:30 PM', '07-25-2020', 'Kurt Cobain', 'Nirvana@hotmail.com', '192-759-0028', 3, FALSE, FALSE, FALSE);
INSERT INTO reservations (region_id, reservation_time, reservation_date, full_name, email, phone_number, party_size, birthday, birthday_name, children, smoking) VALUES (1, '9:30 PM', '07-30-2020', 'Bob Dylan', 'BobDylan@gmail.com', '802-477-9183', 7, TRUE, 'Jimi Hendrix', FALSE, FALSE);
INSERT INTO reservations (region_id, reservation_time, reservation_date, full_name, email, phone_number, party_size, birthday, children, smoking) VALUES (3, '9:30 PM', '07-28-2020', 'Julian Casablancas', 'Strokes@gmail.com', '676-198-3471', 6, FALSE, FALSE, TRUE);


