function schema() {
  return {
    params: {
      type: "object",
      properties: {
        userId: {
          type: "integer",
        },
      },
    },
    required: ["userId"],
  };
}

function handler({ walletService, contractInteraction }) {
  return async function (req, reply) {
    try {
      const body = await walletService.createWallet(req.body.userId);
      contractInteraction.sendPayment(body.address, walletService.getDeployerWallet(), "0.005")
      return reply.code(200).send(body);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = { handler, schema };
