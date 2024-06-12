import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import '../assets/Navbar.css';

const Navbar = () => {
  const authToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ⚔️ Guardian Bank
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          {!authToken ? (
            <>
                <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-links dropdown-toggle" onClick={toggleDropdown}>
                  Login
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <Login />
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/account" className="nav-links">
                  Account
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/management" className="nav-links">
                  Management
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;