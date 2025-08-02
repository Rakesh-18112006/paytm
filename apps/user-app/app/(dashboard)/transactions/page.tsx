// app/(your-path)/page.tsx

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import Transactions from "../../../components/Transactions";

export async function getP2PTransfers(userId: string) {
  const sent = await prisma.p2PTransfer.findMany({
    where: {
      fromUserId: userId,
    },
    include: {
      toUser: true,
    },
  });

  const received = await prisma.p2PTransfer.findMany({
    where: {
      toUserId: userId,
    },
    include: {
      fromUser: true,
    },
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

// ✅ This is a valid Server Component page returning JSX
export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <div className="text-center mt-42 text-red-500">User not logged in</div>;
  }

  const transactions = await getP2PTransfers(session.user.id);

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <Transactions transactions={transactions} />
    </div>
  );
}
