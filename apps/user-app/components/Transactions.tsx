"use client";

import React from "react";

interface Transaction {
  amount: number;
  time: Date;
  counterparty: string;
  type: "Sent" | "Received";
}


interface Props {
  transactions: Transaction[];
}

export default function Transactions({ transactions }: Props) {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Your Transfer History
      </h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <ul className="divide-y divide-gray-200 space-y-3">
           {transactions.map((tx, index) => (
    <div
      key={index}
      className={`p-4 rounded-lg shadow-md border ${
        tx.type === 'Sent' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
      }`}
    >
      <p className="text-lg font-semibold">
        {tx.type === 'Sent' ? 'Sent to' : 'Received from'}{' '}
        <span className="text-indigo-600">{tx.counterparty}</span>
      </p>
      <p className="text-gray-600">Amount: ₹{tx.amount / 100}</p>
      <p className="text-sm text-gray-500">{new Date(tx.time).toLocaleString()}</p>
    </div>
  ))}
        </ul>
      )}
    </div>
  );
}
