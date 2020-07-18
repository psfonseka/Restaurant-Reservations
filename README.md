# Reservations Full Stack Application

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
