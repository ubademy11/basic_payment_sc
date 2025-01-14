const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposits = {};

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  try {

    const basicPayments = await getContract(config, senderWallet);
    const tx = await basicPayments.deposit({
      value: await ethers.utils.parseEther(amountToSend).toHexString(),
    });
    tx.wait(1)
      .then(
        receipt => {
          console.log("Transaction mined");
          const firstEvent = receipt && receipt.events && receipt.events[0];
          console.log(firstEvent);
          if (firstEvent && firstEvent.event == "DepositMade") {
            deposits[tx.hash] = {
              senderAddress: firstEvent.args.sender,
              amountSent: firstEvent.args.amount,
            };
          } else {
            console.error(`Payment not created in tx ${tx.hash}`);
          }
        },
        error => {
          const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
          const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
          console.error("reasons List");
          console.error(reasonsList);

          console.error("message");
          console.error(message);
        },
      );
    return;
  } catch (err) {
    console.log('err1', err)
    throw err;
  }
};


const sendPayment = ({ config }) => async (recipientAddress, deployerWallet, amountToSend) => {
  const options = { gasLimit: 100000 };
  const basicPayments = await getContract(config, deployerWallet);
  const amount = await ethers.utils.parseEther(amountToSend).toHexString();
  const tx = await basicPayments.sendPayment(recipientAddress, amount, options);

  return tx.wait(1).then(receipt => {
    return receipt;
  }, error => {
    throw error;
  });
}

const getDepositReceipt = ({ }) => async depositTxHash => {
  return deposits[depositTxHash];
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  sendPayment: sendPayment(dependencies)
});
