import ShopLogin from 'components/shop/ShopLogin';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller, isLoading } = useSelector((state) => state.shop);

  useEffect(() => {
    if (isSeller) {
      navigate('/dashboard');
    }
  }, [navigate, isSeller, isLoading]);

  return <ShopLogin />;
};

export default ShopLoginPage;
