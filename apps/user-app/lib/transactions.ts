import prisma from "@repo/db/client";

export async function getP2PTransfers(userId: string) {
  const sent = await prisma.p2PTransfer.findMany({
    where: { fromUserId: userId },
    include: { toUser: true },
  });

  const received = await prisma.p2PTransfer.findMany({
    where: { toUserId: userId },
    include: { fromUser: true },
  });

  const mappedSent = sent.map((tx) => ({
    amount: tx.amount,
    time: tx.timestamp,
    counterparty: tx.toUser.username,
    type: "Sent" as const,
  }));

  const mappedReceived = received.map((tx) => ({
    amount: tx.amount,
    time: tx.timestamp,
    counterparty: tx.fromUser.username,
    type: "Received" as const,
  }));

  const allTransactions = [...mappedSent, ...mappedReceived];
  allTransactions.sort((a, b) => b.time.getTime() - a.time.getTime());
  return allTransactions;
}