import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../assets/Form.css'

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Before axios POST request');
      const response = await axios.post('http://localhost:8000/api/user/register/', {
        username,
        password,
      });
      console.log('After axios POST request');
      const accessToken = response.data.access; 
      localStorage.setItem('accessToken', accessToken); 
      navigate('/account');
    } catch (error) {
      setError('Invalid credentials'); 
    }
  };

  return (
    <div className="register-container">
      <h2>Sign up</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <button type="submit" className="register-button">Sign up</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
