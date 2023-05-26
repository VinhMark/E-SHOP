import API from 'api';
import { backend_url } from 'api/server';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Store from 'redux/store';
import styles from 'styles/style';
import Loader from './Layout/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsShop } from 'redux/actions/product';

const ShopInfo = ({ isOwner }) => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.product);
  const [shop, setShop] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getAllProductsShop(id));
    API.get('/shop/get-shop-info/' + id)
      .then((res) => {
        setLoading(false);
        setShop(res.data.shop);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [id, dispatch]);

  const handleLogout = () => {
    API.get('/shop/logout', { withCredentials: true })
      .then((res) => {
        Store.dispatch({ type: 'ShopLogout' });
        toast.success(res.data.message);
        navigate('/dashboard');
      })
      .catch((err) => toast.error(err.response.data));
  };

  // Calculate rating of shop
  const totalReviewLength = products && products.reduce((acc, item) => acc + item.reviews.length, 0);
  const totalRatings =
    products && products.reduce((acc, item) => acc + item.reviews.reduce((sum, review) => sum + review.rating, 0), 0);

  const avgRating = totalRatings / totalReviewLength || 0;

  return (
    <>
      {loading || !shop ? (
        <Loader />
      ) : (
        <div>
          <div className='w-full py-5'>
            <div className='w-full flex items-center justify-center'>
              <img
                src={`${backend_url}${shop.avatar}`}
                alt=''
                className='w-[150px] h-[150px] object-cover rounded-full'
              />
            </div>
            <h3 className='text-center py-2 text-[20px]'>{shop.name}</h3>
            <p className='text-[16px] text-[#000000a6] p-[10px] flex items-center'>{shop.description}</p>
          </div>
          <div className='p-3'>
            <h5 className='font-[600]'>Address:</h5>
            <h4 className='text-[#000000a6]'>{shop.address}</h4>
          </div>
          <div className='p-3'>
            <h5 className='font-[600]'>Phone:</h5>
            <h4 className='text-[#000000a6]'>{shop.phone}</h4>
          </div>
          <div className='p-3'>
            <h5 className='font-[600]'>Total Products:</h5>
            <h4 className='text-[#000000a6]'>{products && products.length}</h4>
          </div>
          <div className='p-3'>
            <h5 className='font-[600]'>Shop Ratings:</h5>
            <h4 className='text-[#000000a6]'>{avgRating}/5</h4>
          </div>
          <div className='p-3'>
            <h5 className='font-[600]'>Join On:</h5>
            <h4 className='text-[#000000a6]'>{new Date(shop.createdAt).toLocaleString()}</h4>
          </div>
          {isOwner && (
            <div className='py-2 px-4'>
              <Link to='/settings' className={`${styles.button} !w-full !h-[42] !rounded-[5px]`}>
                <span className='text-white'>Edit shop</span>
              </Link>
              <div className={`${styles.button} !w-full !h-[42] !rounded-[5px]`} onClick={() => handleLogout()}>
                <span className='text-white'>Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
