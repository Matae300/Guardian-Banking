import { useEffect, useState } from 'react';
import axios from 'axios';
import CardForm from '../components/CardForm';
import AccountForm from '../components/AccountForm';
import '../assets/Management.css';

const Management = () => {
  const authToken = localStorage.getItem('accessToken');
  const [accountData, setAccountData] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    try {
      const [accountResponse, cardResponse] = await Promise.all([
        axios.get('http://localhost:8000/accounts/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }),
        axios.get('http://localhost:8000/cards/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }),
      ]);
      setAccountData(accountResponse.data);
      setCardData(cardResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/accounts/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      getUserData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle deletion error
      
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/cards/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      getUserData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting card:', error);
      // Handle deletion error
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Manage Account</h1>
      {loading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="management-container">
          <div className="card-column">
            <h2>Cards</h2>
            {cardData.map((card, index) => (
              <div key={index} className="card-list">
                <p>{card.card_number} | {card.card_type.toUpperCase()}</p>
                <p className='expiration'>{(card.expiration)} | {card.cvv} ⚔️</p> 
                <button onClick={() => handleDeleteCard(card.id)}>X</button>
              </div>
            ))}
          </div>
          <div className="line"></div>
          <div className="account-column">
            <h2>Accounts</h2>
            {accountData.map((account, index) => (
              <div key={index} className="account-list">
                <h4>GB CONVENIENCE {account.account_type.toUpperCase()}</h4>
                <h5 className="accountNumber">{account.account_number}</h5>
                <button onClick={() => handleDeleteAccount(account.id)}>X</button>
              </div>
            ))}
          </div>
          <div className='transaction-side-nav'>
            <CardForm />
            <br/>
            _________________
            <AccountForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
