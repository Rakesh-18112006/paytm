import express from "express"
import prisma from "@repo/db/client";

const app = express();


app.post('/hdfcWebhook', async (req, res) => {
    //add zod vaidation pending task
    // Check if this request is actually comes from hdfc bank , use a Webhook secret
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount : req.body.amount

    }
    try {
        await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    status: "success"
                }
            })
        ]);
        res.status(200).json({
            message: "captured"
        });
    } catch (e) {
        console.log(e);
        res.status(411).json({ error: "ERR While processing webhook" });
    }
});

app.listen(3003);