import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css'

const Navbar = () => {
  const authToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
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
                  Login
                </Link>
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
