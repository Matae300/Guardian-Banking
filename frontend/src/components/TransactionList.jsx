import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import '../assets/Transaction.css';

const Transaction = () => {
  const authToken = localStorage.getItem('accessToken');
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTransaction = async () => {
    try {
      const response = await axios.get('http://localhost:8000/transactions/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTransactionData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading account data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="transaction-container">
          <h2 className="transaction-heading">Account History</h2>
          {transactionData.map((transaction, index) => (
            <div key={index} className="transaction-item">
             <p className="transaction-info">
                {moment(transaction.date_time).format('MMMM Do YYYY').toUpperCase()} {transaction.transaction_type.toUpperCase()} <span style={{ color: 'green' }}>${transaction.amount.toUpperCase()}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transaction;
