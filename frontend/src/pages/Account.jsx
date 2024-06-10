import { useEffect, useState } from 'react';
import axios from 'axios';
import Transaction from '../components/TransactionList';
import CardList from '../components/CardList';
import '../assets/Form.css';
import '../assets/Account.css';
import '../assets/Card.css'

const CreateAccount = () => {
  const authToken = localStorage.getItem('accessToken');
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [showAccount, setshowAccount] = useState({});

  const getAccount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/accounts/', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setAccountData(response.data);
    } catch (error) {
      console.error('Error fetching account:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const handleAccountClick = (index) => {
    setshowAccount((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      {loading ? (
        <p>Loading account data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : accountData.length === 0 ? (
        <p>No accounts yet? Create one Now!</p>
      ) : (
        <div>
          <h2>Account Details</h2>
          <CardList/>
          {accountData.map((account, index) => (
            <div key={index} className="account-item" onClick={() => handleAccountClick(index)}>
              <h4>GB CONVENIENCE {account.account_type.toUpperCase()} ${account.balance}</h4>
              <h5 className='accountNumber'>{account.account_number}</h5>
              {showAccount[index] && (
                <div className="dropdown">
                  <Transaction />
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