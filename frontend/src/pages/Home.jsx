import King from '../assets/images/emperor.jpg';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../assets/Home.css';

const Home = () => {
    
  return (
      <Container fluid className="home-container">
        <Row className="align-items-center home-card">
          <Col md={4}>
            <img className="img-fluid rounded-circle home-img" src={King} alt="King" />
          </Col>
          <Col md={8} className="home-content">
            <h1 className="home-h1">Guard your money as a Knight would guard his king!</h1>
            <Button variant="primary" className="home-button">Login</Button>
            <Button variant="secondary" className="home-button">Signup</Button>
            <p className="home-p">Want to know more about Guardian Bank?</p>
          </Col>
        </Row>
        <Row className="middle">
          <Col md={3}><p>Checking Accounts</p></Col>
          <Col md={3}><p>Savings Accounts</p></Col>
          <Col md={3}><p>Credit Cards</p></Col>
          <Col md={3}><p>Personal Loans</p></Col>
        </Row>
        <Row className="low">
          <Col md={6}>
            <h3>Live customer service when you need it</h3>
            <p>Call 1-999-782-9100 to talk to a real person any time of day, any day of the week</p>
          </Col>
          <Col md={6}>
            <h3>Quick and easy instant-issue cards</h3>
            <p>Order a new or replacement card at your nearest bank location and take it with you the same day</p>
          </Col>
          <Col md={6}>
            <h3>Pay your bills on the go</h3>
            <p>Make payments, view history and get e-bills. Reduce the hassle of paying bills with Bill Pay and the TD Bank app</p>
          </Col>
          <Col md={6}>
            <h3>Deposit checks anytime</h3>
            <p>Deposit checks using your smartphone or tablet camera with TD Bank Mobile Deposit. Funds are usually available the next business day</p>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Home;