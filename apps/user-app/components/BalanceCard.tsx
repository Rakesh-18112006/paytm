

const BalanceCard = ({ amount  }: { amount: number }) => {
  return (
    <div className="bg-blue-600 text-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium mb-2">Account Balance</h3>
          <p className="text-3xl font-bold">₹{amount/100} INR</p>
    </div>
  );
};

export default BalanceCard;
