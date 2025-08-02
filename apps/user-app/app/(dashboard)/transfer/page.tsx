// app/transfer/page.tsx or wherever this file is
import { getServerSession } from "next-auth";
import AddMoney from "../../../components/AddMoney";
import BalanceCard from "../../../components/BalanceCard";
import OnRampTransactions from "../../../components/OnRampTransactions";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";

async function getBalance(userId: string) {
  const balance = await prisma.balance.findFirst({
    where: {
      userId: userId,
    },
  });

  return {
    amount: balance?.amount || 1000,
  };
}

async function getOnRampTransactions(userId: string) {
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: userId,
    },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;
  const balance = await getBalance(userId);
  const transactions = await getOnRampTransactions(userId);

  return (
    <div className="p-8 md:mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Transfer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Add Money Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Add Money</h2>
          <AddMoney defaultBank="HDFC Bank" />
        </div>

        {/* Right Side - Balance and Transactions */}
        <div className="space-y-6">
          <BalanceCard amount={balance.amount} />
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

