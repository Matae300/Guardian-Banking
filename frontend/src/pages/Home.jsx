import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import low4 from '../assets/images/low4.png';
import low3 from '../assets/images/low3.png';
import low2 from '../assets/images/low2.png';
import low1 from '../assets/images/low1.png';
import King from '../assets/images/emperor.jpg';
import '../assets/Home.css'; 

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Container fluid className="home-container">
      <Row className="align-items-center home-card">
        <Col md={4}>
          <img className="img-fluid rounded-circle home-img" src={King} alt="King" />
        </Col>
        <Col md={8} className="home-content">
        <h1 className="home-h1">Guard your money as a Knight would guard his king!</h1>
        {isLoggedIn ? (
          <>
            <Link to="/account">
              <Button className="home-button">Go to Account</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <Button className="home-button">Signup</Button>
            </Link>
          </>
        )}
       <p className="home-p">Want to know more about Guardian Bank?</p>
      </Col>
      </Row>
      <Row className="middle">
        <Col md={6}><h2>💰</h2><h3>Checking Accounts</h3></Col>
        <Col md={6}><h2>🧧</h2><h3>Savings Accounts</h3></Col>
        <Col md={6}><h2>💳</h2><h3>Credit Cards</h3></Col>
        <Col md={6}><h2>🏦</h2><h3>Personal Loans</h3></Col>
      </Row>
      <Row className="low">
        <Col md={6}>
          <img src={low3} alt="Customer Service"/>
          <h3>Live customer service when you need it</h3>
          <p>Call 1-999-782-9100 to talk to a real person any time of day, any day of the week</p>
        </Col>
        <Col md={6}>
          <img src={low2} alt="Instant Issue Cards"/>
          <h3>Quick and easy instant-issue cards</h3>
          <p>Order a new or replacement card at your nearest bank location and take it with you the same day</p>
        </Col>
        <Col md={6}>
          <img src={low4} alt="Pay Bills"/>
          <h3>Pay your bills on the go</h3>
          <p>Make payments, view history and get e-bills. Reduce the hassle of paying bills with Bill Pay and the TD Bank app</p>
        </Col>
        <Col md={6}>
          <img src={low1} alt="Deposit Checks"/>
          <h3>Deposit checks anytime</h3>
          <p>Deposit checks using your smartphone or tablet camera with TD Bank Mobile Deposit. Funds are usually available the next business day</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
