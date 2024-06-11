import { useState } from 'react';
import axios from 'axios';
import '../assets/Form.css';

const CardForm = () => {
  const [cardType, setCardType] = useState('debit');
  const authToken = localStorage.getItem('accessToken');

  function generateCardNumber() {
    // Generate a random 16-digit card number
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000);
  }

  function generateCvvNumber() {
    // Generate a random 3-digit CVV number
    return Math.floor(100 + Math.random() * 900);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cardNumber = generateCardNumber();
    const cvvNumber = generateCvvNumber();
    const expirationDate = new Date(); 
    expirationDate.setFullYear(expirationDate.getFullYear() + 5); // Add 5 years to the current year
  
    try {
      const response = await axios.post('http://localhost:8000/cards/', {
        card_number: cardNumber,
        card_type: cardType,
        expiration: expirationDate.toISOString().slice(0, 10), 
        cvv: cvvNumber,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('Card created successfully:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating card:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="card-form">
      <h2>Create Card</h2>
      <form onSubmit={handleFormSubmit} className="card-form">
        <label htmlFor="cardType">Card Type</label>
        <select
          id="cardType"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
          className="form-control"
        >
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
        <button type="submit" className="submit-button">Create Card</button>
      </form>
    </div>
  );
};

export default CardForm;
