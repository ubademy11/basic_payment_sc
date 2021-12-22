'use strict';

const jwt = require('jsonwebtoken');

const { logger } = require('../logger');

const { JWT_SECRET } = require('../../constants');
const { INVALID_TOKEN } = require('./errorCodes');

function generateToken({ id, role }) {
  const tokenPayload = { id, role };

  return jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: '720h',
  });
}

function decodeToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    logger.warn({ token }, 'Token failed validation');
    throw new Error(INVALID_TOKEN);
  }
}

module.exports = {
  generateToken,
  decodeToken,
};
