const Pool = require('pg').Pool;
require('dotenv').config();

//Alternative devConfig
// const devConfig = {
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   host: process.env.POSTGRES_HOST,
//   port: process.env.POSTGRES_PORT,
//   database: process.env.POSTGRES_DB,
// };

const devConfig = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const prodConfig = process.env.DATABASE_URL; //provided by heroku addon

const poolOptions =
  process.env.NODE_ENV === 'production'
    ? {
        connectionString: prodConfig,
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {
        connectionString: devConfig,
      };

const pool = new Pool(poolOptions);

postgres: module.exports = pool;
