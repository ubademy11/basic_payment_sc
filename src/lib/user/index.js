'use strict';

const { Op } = require('sequelize');
const User = require('./model');

const errorCodes = require('./errorCodes');

async function findUserByParams(params) {
  const resultSet = await User.findOne({ where: { ...params } });
  return resultSet != null ? resultSet.dataValues : null;
}

module.exports = {
  model: User,
};
