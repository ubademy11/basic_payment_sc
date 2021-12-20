
function schema() {
    return {
        params: {
            type: "object",
            properties: {
                walletAddress: {
                    type: "string"
                },
                amount: {
                    type: "number"
                }
            },
        },
        required: ["walletAddress", "amount"],
    };
}

function handler({ contractInteraction, walletService }) {
    return async function (req, reply) {
        const body = await contractInteraction.sendPayment(walletService.getWallet(req.query.walletId), walletService.getDeployerWallet(), req.query.amount);
        return reply.code(200).send(body);
    };
}

module.exports = { handler, schema };
