const initOptions = {/* initialization options */};
const pgp = require('pg-promise')(initOptions);
const connection = {
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  database: process.DB_DATABASE || 'reservations',
  user: process.DB_USER || 'dev',
  password: process.DB_PASSWORD || 'admin',
  max: 30 // use up to 30 connections
};

const db = pgp(connection);

module.exports = db;

