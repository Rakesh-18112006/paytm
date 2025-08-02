"use client";

import { useState } from "react";


const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" }
];

interface Props {
  defaultBank: string;
}

const AddMoney: React.FC<Props> = ({ defaultBank }) => {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState(defaultBank);

const handleTransfer = async () => {
  const bank = SUPPORTED_BANKS.find((b) => b.name === selectedBank);
  if (!bank) return;

  await fetch("/api/transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: Number(amount) * 100,
      provider: selectedBank,
    }),
  });

  window.location.href = bank.redirectUrl;
};


  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bank</label>
        <select
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {SUPPORTED_BANKS.map((bank) => (
            <option key={bank.name} value={bank.name}>{bank.name}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleTransfer}
        disabled={!selectedBank}
        className={`w-full ${
          !selectedBank ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-medium py-2 px-4 rounded-md transition-colors`}
      >
        Add Money
      </button>
    </div>
  );
};

export default AddMoney;
