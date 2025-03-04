require("dotenv").config();
const network = "ropsten";
const deployArtifact = require(`../deployments/${network}/BasicPayments`);
const deployerMnemonic = process.env.MNEMONIC;
const infuraApiKey = process.env.INFURA_API_KEY;

module.exports = {
  contractAddress: deployArtifact.address,
  contractAbi: deployArtifact.abi,
  deployerMnemonic,
  infuraApiKey,
  network,
};
