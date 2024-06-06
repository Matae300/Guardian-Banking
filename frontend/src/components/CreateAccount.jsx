import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../assets/Form.css'

const CreateAccount = () => {
  const [balance] = useState('0.00'); 
  const [accountType, setAccountType] = useState('option1'); 
  const navigate = useNavigate();
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
      navigate('/account');
    } catch (error) {
      console.error('Error creating account:', error.response.data);
    }
  };

  return (
    <div className="">
      <h2>Create Account</h2>
      <form onSubmit={handleFormSubmit}>
        <select
          value={accountType} 
          onChange={(e) => setAccountType(e.target.value)} 
          className="form-control" 
        >
          <option value="option1">Checking</option>
          <option value="option2">Savings</option>
        </select>
        <button type="submit" className="">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;