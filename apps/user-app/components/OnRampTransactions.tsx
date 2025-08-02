"use client";

import { useEffect, useState } from "react";

export interface Transaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

interface OnRampTransactionsProps {
  transactions: Transaction[];
}

const OnRampTransactions = ({ transactions }: OnRampTransactionsProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h3>

      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No Recent transactions</div>
      ) : (
        <div className="space-y-4">
          {transactions.map((t, index) => (
            <div key={index} className="flex justify-between border-b border-gray-100 pb-3 last:border-0">
              <div>
                <div className="text-sm font-medium">Received INR via {t.provider}</div>
                <div className="text-xs text-gray-500">
                  {isClient ? t.time.toDateString() : ""}
                </div>
              </div>
              <div className="text-green-600 font-medium">
                + ₹{(t.amount / 100).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnRampTransactions;
