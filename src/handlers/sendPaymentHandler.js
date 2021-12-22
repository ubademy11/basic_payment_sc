
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
    return async function (req, reply) {
        try {
            await contractInteraction.sendPayment(req.body.address, walletService.getDeployerWallet(), req.body.amount);
            return reply.send();
        } catch (err) {
            console.log('err', err)
            return reply.code(422).send(err.message);
        }
    };
}

module.exports = { handler, schema };
