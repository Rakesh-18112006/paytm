'use client';

import React, { useState } from 'react';
import { p2pTransfer } from '../lib/actions/p2pTransfer';

const SendMoneyCard: React.FC = () => {
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSend = async() => {
      try {
          await p2pTransfer(number, amount*100);
        console.log('Sending money to:', number, 'Amount:', amount);
      } catch {
          
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen -m-7 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Send Money</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="number">
            Mobile Number
          </label>
          <input
            id="number"
            type="tel"
            placeholder="Enter mobile number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSend}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendMoneyCard;
