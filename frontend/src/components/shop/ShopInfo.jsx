import API from 'api';
import { backend_url } from 'api/server';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Store from 'redux/store';
import styles from 'styles/style';
import Loader from './Layout/Loader';

const ShopInfo = ({ isOwner }) => {
  const navigate = useNavigate();
  const [shop, setShop] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    API.get('/shop/get-shop-info/' + id)
      .then((res) => {
        setLoading(false);
        setShop(res.data.shop);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  const handleLogout = () => {
    API.get('/shop/logout', { withCredentials: true })
      .then((res) => {
        Store.dispatch({ type: 'ShopLogout' });
        toast.success(res.data.message);
        navigate('/dashboard');
      })
      .catch((err) => toast.error(err.response.data));
  };

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
            <h4 className='text-[#000000a6]'>10</h4>
          </div>
          <div className='p-3'>
            <h5 className='font-[600]'>Shop Ratings:</h5>
            <h4 className='text-[#000000a6]'>4/5</h4>
          </div>
          <div className='p-3'>
            <h5 className='font-[600]'>Join On:</h5>
            <h4 className='text-[#000000a6]'>{shop.createdAt.slice(0, 10)}</h4>
          </div>
          {isOwner && (
            <div className='py-2 px-4'>
              <div className={`${styles.button} !w-full !h-[42] !rounded-[5px]`}>
                <span className='text-white'>Edit shop</span>
              </div>
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
