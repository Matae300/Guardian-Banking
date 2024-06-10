import { useEffect, useState } from 'react';
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
      ) : (
        <>
          <h2>Cards</h2>
          <p>Manage Cards</p>
          {cardData.map((card, index) => (
            <div key={index} className="transaction-item">
              <p>{moment(card.date_time).format('MMMM Do YYYY').toUpperCase()} {card.card_type.toUpperCase()} </p>
              <p>{card.card_number}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CardList;
