import { Container, Row, Col } from 'react-bootstrap';
import Login from '../components/Login';
import Signup from '../components/Signup';
import DesignerImage from '../assets/images/Designer.png';
import '../assets/Register.css'; // Import your CSS file

const Register = () => {
  return (
    <Container className="container">
      <Row className="row-container">
        <Col className="image-container">
          <img src={DesignerImage} alt="Designer" className="image" />
        </Col>
        <Col className="form-container">
          <h1 className="text-center">Welcome to Online Banking</h1>
          <Login />
          <Signup />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
