import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const CardList = () => {
  const authToken = localStorage.getItem('accessToken');
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCards = async () => {
    try {
      const response = await axios.get('http://localhost:8000/cards/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      setError(error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <div className="side-nav"> 
      {loading ? (
        <p>Loading card data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : cardData.length === 0 ? (
        <Link to='/management' className='link-class'>
        <p className='error-p'>No Cards</p>
        </Link>
      ) : (
        <>
          <h2>Cards</h2>
          <Link to="/management">
            <p>Manage Account</p>
          </Link>
          {cardData.map((card, index) => (
            <Link to={`/management`} key={index}>
              <div className="transaction-item">
                <p>{moment(card.date_time).format('MMMM Do YYYY').toUpperCase()} {card.card_type.toUpperCase()} </p>
                <p>{card.card_number}</p>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default CardList;
