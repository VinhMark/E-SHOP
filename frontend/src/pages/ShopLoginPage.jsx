import ShopLogin from 'components/shop/ShopLogin';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { isSeller } = useSelector((state) => state.shop);

  useEffect(() => {
    if (isSeller) {
      navigate('/');
    }
  }, [navigate, isSeller]);

  return <ShopLogin />;
};

export default ShopLoginPage;
