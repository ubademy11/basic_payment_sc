const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getDeposit = require("./handlers/getDepositHandler");
const sendPayment = require("./handlers/sendPaymentHandler");
const getWalletInfo = require("./handlers/getWalletInfoHandler");
const { decodeToken } = require('./lib/user/helpers');

const sendForbidden = (reply, errorMessage) => reply.status(401).send({ error: errorMessage });

const authorize = (req, reply, done) => {
  const jwtHeaderValue =
  req.headers['x-access-token'] ||
    (req.headers.authorization && req.headers.authorization.replace(/^Bearer\s+/, ''));
  if (!jwtHeaderValue) return sendForbidden(reply, 'The user is not authenticated');
  const tokenPayload = decodeToken(jwtHeaderValue);
  if (!(tokenPayload.role == 'USER' || tokenPayload.role == 'ADMIN')) return sendForbidden(reply, 'The user is not authenticated');
  console.log(tokenPayload);
  req.user = tokenPayload;
  done()
}

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet/:id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet",
    schema: getWalletsData.schema(config),
    preHandler: authorize,
    handler: getWalletsData.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function getDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}
function sendPaymentRoute({ services, config }) {
  return {
    method: "POST",
    url: "/withdraw",
    schema: sendPayment.schema(config),
    handler: sendPayment.handler({ config, ...services }),
  };

}
function getWalletInfoRoute({ services, config }) {
  return {
    method: "GET",
    url: "/walletInfo",
    schema: getWalletInfo.schema(config),
    preHandler: authorize,
    handler: getWalletInfo.handler({ config, ...services }),
  }
}

module.exports = [getWalletDataRoute, getWalletsDataRoute, createWalletRoute, createDepositRoute, getDepositRoute, sendPaymentRoute, getWalletInfoRoute];
