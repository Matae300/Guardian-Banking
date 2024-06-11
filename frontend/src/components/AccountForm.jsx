import { useState } from 'react';
import axios from 'axios';
import '../assets/Form.css';

const AccountForm = () => {
  const [balance] = useState('0.00'); 
  const [accountType, setAccountType] = useState('checking'); 
  const authToken = localStorage.getItem('accessToken');

  function generateAccountNumber() {
    // Generate a random 12-digit account number
    return Math.floor(100000000000 + Math.random() * 900000000000);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const accountNumber = generateAccountNumber();
    try {
      const response = await axios.post('http://localhost:8000/accounts/', {
        account_number: accountNumber,
        balance: balance,
        account_type: accountType
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('Account created successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating account:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="account-form">
      <h2>Create Account</h2>
      <form onSubmit={handleFormSubmit}>
      <label htmlFor="cardType">Account Type</label>
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="form-control"
        >
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>
        <button type="submit" className="">Create Account</button>
      </form>
    </div>
  );
};

export default AccountForm;
