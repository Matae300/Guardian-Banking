import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'; 

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/register/', {
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

  if (loggedIn) {
    return <Redirect to="/" />; 
  }

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
