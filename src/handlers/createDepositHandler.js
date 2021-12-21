function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req, reply) {
    try {
      await contractInteraction.deposit(walletService.getWallet(req.body.senderId), req.body.amountInEthers);
      return reply.send();
    } catch (err) {
      return reply.code(422).send();
    }
  };
}

module.exports = { schema, handler };
