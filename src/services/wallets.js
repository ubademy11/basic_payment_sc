const ethers = require("ethers");
const Wallet = require('../lib/wallet/model');

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async (userId) => {
  const provider = new ethers.providers.InfuraProvider("ropsten", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  await Wallet.create({
    id: userId,
    userId: userId,
    address: wallet.address,
    privateKey: wallet.privateKey,
  });
  const result = {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
  return result;
};

const getWalletsData = () => () => {
  return Wallet.findAll();
};

const getWalletData = () => async (userId) => {
  const wallet = await Wallet.findOne({
    where: {
      userId,
    }
  });
  return wallet;
};

const getWallet = ({ }) => async (id) => {
  const provider = new ethers.providers.InfuraProvider("ropsten", process.env.INFURA_API_KEY);
  const wallet = await getWalletData()(id);
  return new ethers.Wallet(wallet.privateKey, provider);
};

const getBalance = ({ }) => async (userId) => {
  const provider = new ethers.providers.InfuraProvider("ropsten", process.env.INFURA_API_KEY);
  const wallet = await getWalletData()(userId);
  return provider.getBalance(wallet.address).then((balance) => {
    balanceInEth = ethers.utils.formatEther(balance);
    const res = { address: wallet.address, balance: balanceInEth };
    return res;
  })
}

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getBalance: getBalance({ config }),
});
