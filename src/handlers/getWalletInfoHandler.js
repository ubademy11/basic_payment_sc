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
        const body = await walletService.getWalletInfo(req.user.id);
        reply.code(200).send(body);
    };
}

module.exports = { handler, schema };
