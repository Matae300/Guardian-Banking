import { useEffect, useState } from 'react';
import axios from 'axios';

const Transaction = () => {
  const authToken = localStorage.getItem('accessToken');
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTransaction = async () => {
    try {
      const response = await axios.get('http://localhost:8000/transactions/', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setTransactionData(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  console.log(transactionData)

  useEffect(() => {
    getTransaction();
  }, []);

  
  return (
    <div className="">
      {loading ? (
        <p>Loading account data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>transactions</h2>
          {transactionData.map((transaction, index) => (
            <div key={index} className="transaction-item">
              <p>transaction: {transaction.transaction_id}</p>
              <p>type: {transaction.transaction_type}</p>
              <p>amount: ${transaction.amount}</p>
              <p>date: {Date(transaction.date_time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transaction;
