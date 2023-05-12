import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const SellerProtectedRoute = ({ children }) => {
  const { isSeller } = useSelector((state) => state.shop);
  if (!isSeller) {
    return <Navigate to='/shop-login' />;
  }
  return children;
};

export default SellerProtectedRoute;
