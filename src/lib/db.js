'use strict';

const { Sequelize } = require('sequelize');

const options = {
  logging: false,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
};

let sequelize;

if (process.env.DB_URI) sequelize = new Sequelize(process.env.DB_URI, options);
else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    protocol: 'postgres',
    ...options,
  });
}

const connectToDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};

module.exports = { connectToDB, dbInstance: sequelize };