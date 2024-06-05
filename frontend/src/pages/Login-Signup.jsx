import Login from '../components/Login'
import Signup from '../components/Signup'
import Designer from '../assets/images/Designer.png'

const Register = () => {
  return (
    <div>
      <Login/>
      <Signup/>
      <img src={Designer}/>
    </div>
  );
};

export default Register;