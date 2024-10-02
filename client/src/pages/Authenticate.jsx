import { useLocation } from 'react-router-dom';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';

const Authenticate = () => {
  const location = useLocation();

  return (
    <div>
      <h2>{location.pathname === '/auth/login' ? 'Login' : 'Register'}</h2>
      {location.pathname === '/auth/login' ? <Login /> : <Register />}
    </div>
  );
};

export default Authenticate;
