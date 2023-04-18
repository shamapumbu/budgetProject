import React, { useState, useEffect } from 'react';
import { getTransactions } from '../services/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const startDate = '2021-01-01';
      const endDate = '2021-12-31';
      const data = await getTransactions(startDate, endDate);
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.transaction_id}>
            {transaction.date} - {transaction.name} - {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
