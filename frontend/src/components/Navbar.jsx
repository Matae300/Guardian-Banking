import { Link } from 'react-router-dom';
import '../assets/Navbar.css'

const Navbar = () => {

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
          <li className="nav-item">
            <Link to="/register" className="nav-links">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/account" className="nav-links">
              Account
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
