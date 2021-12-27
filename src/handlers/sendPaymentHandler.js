
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
            let amount;
            if (req.body.membershipType == "Bronze") amount = "0.025";
            if (req.body.membershipType == "Silver") amount = "0.03"
            if (req.body.membershipType == "Gold") amount = "0.05";
            const wallet = await walletService.getWallet(req.body.userId);
            const body = await contractInteraction
                .sendPayment(wallet.address,
                    walletService.getDeployerWallet(),
                    amount);
            return reply.send({ transactionHash: body.transactionHash });
        } catch (err) {
            console.log('err', err)
            return reply.code(422).send(err.message);
        }
    };
}

module.exports = { handler, schema };
