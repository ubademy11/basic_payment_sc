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

function handler({ walletService }) {
  return async function (req, reply) {
    try {
      const body = await walletService.createWallet(req.body.userId);
      return reply.code(200).send(body);
    } catch (err) {
      console.error(err);
    }
  };
}

module.exports = { handler, schema };
