import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../assets/Form.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      const accessToken = response.data.access; 
      localStorage.setItem('accessToken', accessToken); 
      setLoggedIn(true); 
    } catch (error) {
      setError('Invalid credentials'); 
    }
  };

  if (loggedIn){
    return navigate("/");
 }

  return (
    <div className="register-container">
    <h2>Login</h2>
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
      <button type="submit" className="register-button">Login</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  </div>
 );
};

export default LoginPage;
