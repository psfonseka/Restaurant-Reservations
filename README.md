# Reservations Full Stack Application

This is a full stack restaurant reservations application. I based the SPA on my experiences with movie theaters, which could sometimes be difficult to deal with, especially when looking for high demand showings. One thing I wanted to add that the theaters usually would not have is an immediate update of when a seat (or in this case reservation slow) is taken. So in this case, after information is taken to find what dining regions the party is eligible to dine at, it shows all of the timeslots for each day of the week, to give the user as much info as possible.

### Guest Info

- [x] Form asks for Name, Email, Phone Number, Party Size, Birthday Info, Children/Smoker Info
- [x] Form validation
- [x] API request on submission to find eligible dining regions

### Region Selection

- [x] Selector lists eligible regions
- [x] If there are none, let the user know
- [x] Whenever a different region is selected, API request is sent to load the reservation slots for it
- [x] If there is at least one eligible reason, the first one is automatically selected at the start

### Slot Selection

- [x] Taken slots are greyed out and cannot be selected
- [x] Selected slot is blue
- [x] Slots update in real-time when they are taken

### Confirmation

- [x] Lists all relevent information
- [x] Once it is in the DB, it confirms the reservation and the API updates the reservation slot as taken

### General

- [x] If a previous step is changed, the steps after reset to change with the results of previous steps' API request

One thing I would change later for that is having steps after the changed one not lose progress if they aren't neccesarily impacted by changes to preceeding info. I would also maybe add something to indicate a slot being selected by another user, but not yet being confirmed. 

## How to get started:

- [ ] `git clone` the repo.
- [ ] Install dependencies with `npm install`.
- [ ] Configure a `.env` file, using `example.env` as a guide.

Please contact the project administrators if you have any questions or concerns.

### For development environments:
- Start the Postgres Server. 
  - [ ] If using a local Postgres Server, run /db/init/setup.sql to intialize the database.
  - [ ] If using Docker, run `npm run db-start:dev` to create the postgres container on Port 5432. 'setup.sql' will run automatically.
- Build the client and start the Express Server. 
  - [ ] Clean `client/dist`, if necessary, by running `npm run clean-client`
  - [ ] Run the following `npm` scripts concurrently:
    - [ ] `npm run build:dev` to watch for changes and compile the client application
    - [ ] `npm run start:dev` to run the server using `nodemon`.

## Credits

Made with [createapp.dev](https://createapp.dev/)
