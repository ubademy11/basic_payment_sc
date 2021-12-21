
function schema() {
    return {
        params: {
            type: "object",
            properties: {
                address: {
                    type: "string"
                },
                amount: {
                    type: "number"
                }
            },
        },
        required: ["address", "amount"],
    };
}

function handler({ contractInteraction, walletService }) {
    return async function (req, res) {
        // const body = await contractInteraction.sendPayment(req.body.address, walletService.getDeployerWallet(), req.body.amount);
        // return reply.code(200).send(body);
        try {
            return contractInteraction.sendPayment(req.body.address, walletService.getDeployerWallet(), req.body.amount);
        } catch (err) {
            return res.sendStatus(422);
        }
    };
}

module.exports = { handler, schema };
