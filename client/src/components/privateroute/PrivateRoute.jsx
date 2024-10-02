import { Navigate } from 'react-router-dom'; // Import Navigate for redirecting

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!document.cookie.match(/access_token/); // Check if user is logged in

  // If user is authenticated, render the child component
  // If not, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
