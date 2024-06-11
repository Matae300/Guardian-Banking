import { useState } from 'react';
import axios from 'axios';
import '../assets/Form.css';

const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState('deposit');
  const [sourceAccountNumber, setSourceAccountNumber] = useState('');
  const [destinationAccountNumber, setDestinationAccountNumber] = useState('');
  const [amount, setAmount] = useState('0.00');
  const authToken = localStorage.getItem('accessToken');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post('http://localhost:8000/transactions/', {
        source_account_number: sourceAccountNumber,
        destination_account_number: transactionType === 'transfer' ? destinationAccountNumber : undefined,
        amount: amount,
        transaction_type: transactionType
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('Transaction created successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating transaction:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="transaction-side-nav">
      <h2>Create Transaction</h2>
      <form onSubmit={handleFormSubmit} className="card-form">
        <label htmlFor="sourceAccountNumber">Source Account Number</label>
        <input
          type="text"
          id="sourceAccountNumber"
          value={sourceAccountNumber}
          onChange={(e) => setSourceAccountNumber(e.target.value)}
          className="form-control"
        />
        {transactionType === 'transfer' && (
          <>
            <label htmlFor="destinationAccountNumber">Destination Account Number</label>
            <input
              type="text"
              id="destinationAccountNumber"
              value={destinationAccountNumber}
              onChange={(e) => setDestinationAccountNumber(e.target.value)}
              className="form-control"
            />
          </>
        )}
        <label htmlFor="amount">Amount</label>
         <input
          type="text"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
        />
        <label htmlFor="transactionType">Transaction Type</label>
        <select
          id="transactionType"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="form-control"
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="transfer">Transfer</option>
        </select>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default TransactionForm;
