import express from "express";
import prisma from "@repo/db/client";

const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    // TODO: Add zod validation here later
    
   //add zod vaidation pending task
    // Check if this request is actually comes from hdfc bank , use a Webhook secret

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };

  if (!paymentInformation.token || !paymentInformation.userId || !paymentInformation.amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await prisma.$transaction([
      prisma.balance.updateMany({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      prisma.onRampTransaction.updateMany({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          status: "success",
        },
      }),
    ]);

    res.status(200).json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "ERR While processing webhook" });
  }
});

app.listen(3003, () => {
  console.log("Bank webhook server running on port 3003");
});




