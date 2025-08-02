// app/(your-path)/page.tsx

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import Transactions from "../../../components/Transactions";
import { getP2PTransfers } from "../../../lib/transactions";
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
