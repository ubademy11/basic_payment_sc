'use strict';

const { decodeToken } = require('../user/helpers');

const sendForbidden = (res, errorMessage) => res.status(401).send({ error: errorMessage });

const authorize = (roles = []) => {
  return (req, res, next) => {
    const jwtHeaderValue =
      req.headers['x-access-token'] ||
      (req.headers.authorization && req.headers.authorization.replace(/^Bearer\s+/, ''));

    if (!jwtHeaderValue) return sendForbidden(res, 'The user is not authenticated');

    const tokenPayload = decodeToken(jwtHeaderValue);

    if (!roles.includes(tokenPayload.role)) return sendForbidden(res, 'The user is unauthorized');

    req.user = tokenPayload;

    return next();
  };
};

module.exports = authorize;
