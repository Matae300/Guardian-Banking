import  { useEffect, useState } from 'react';
import axios from 'axios';
import AddAccount from '../components/CreateAccount';
import Card from '../components/Card';
import '../assets/Form.css';

const CreateAccount = () => {
  const authToken = localStorage.getItem('accessToken');
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAccount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/accounts/', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setAccountData(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching account:', error);
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <div className="">
      <AddAccount /> 
      <Card /> 
      {loading ? (
        <p>Loading account data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h2>Account Details</h2>
          {accountData.map((account, index) => (
            <div key={index} className="account-item">
              <p>Account Number: {account.account_number}</p>
              <p>Balance: {account.balance}</p>
              <p>Type: {account.account_type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
