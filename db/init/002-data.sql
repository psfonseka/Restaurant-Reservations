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
INSERT INTO regions (region_name, max_size, children_allowed, smoking_allowed) VALUES ('Riverise (smoking allowed)', 6, FALSE, TRUE);

INSERT INTO reservations (region_id, reservation_time, reservation_date) VALUES (2, '7:00 PM', '07-24-2020');
INSERT INTO reservations (region_id, reservation_time, reservation_date) VALUES (4, '7:30 PM', '07-25-2020');


INSERT INTO confirmations (reservation_id, full_name, email, phone_number, party_size, birthday, birthday_name) VALUES (1, 'Alex Turner', 'ArcticMonkeys@gmail.com', '824-281-0193', 4, TRUE, 'Matt Helders');
INSERT INTO confirmations (reservation_id, full_name, email, phone_number, party_size, birthday) VALUES (2, 'Kurt Cobain', 'Nirvana@hotmail.com', '192-759-0028', 3, FALSE);