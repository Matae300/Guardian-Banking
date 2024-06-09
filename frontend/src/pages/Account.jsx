import { useEffect, useState } from 'react';
import axios from 'axios';
import AddAccount from '../components/CreateAccount';
import Card from '../components/Card';
import Transaction from '../components/Transaction';
import '../assets/Form.css';
import '../assets/Account.css';

const CreateAccount = () => {
  const authToken = localStorage.getItem('accessToken');
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAccount, setOpenAccount] = useState(null); 

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

  const toggleAccount = (index) => {
    setOpenAccount(openAccount === index ? null : index);
  };

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
          <h2>Accounts</h2>
          {accountData.map((account, index) => (
            <div key={index} className="account-item" onClick={() => toggleAccount(index)}>
              <p>Balance: ${account.balance}</p>
              <p>Type: {account.account_type}</p>
              {openAccount === index && (
                <div className="dropdown">
                  {/* Dropdown content here */}
                  <p>Account Number: {account.account_number}</p>
                  <Transaction/>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
