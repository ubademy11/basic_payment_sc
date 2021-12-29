function schema() {
    return {
        params: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                },
            },
        },
        required: ["id"],
    };
}

function handler({ walletService }) {
    return async function (req, reply) {
        const balance = await walletService.getBalance(req.query.userId);
        reply.code(200).send({ balance: balance });
    };
}

module.exports = { handler, schema };
