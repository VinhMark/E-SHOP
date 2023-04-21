import API from 'api';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadShop } from 'redux/actions/shop';
import Store from 'redux/store';
import styles from 'styles/style';

const ShopLogin = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post('/shop/shop-login', { email, password }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        Store.dispatch(loadShop());
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {/* Header name */}
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Login to your shop</h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                autoComplete='email'
                required
                placeholder='Enter your email shop...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={visible ? 'text' : 'password'}
                  name='password'
                  id='password'
                  autoComplete='password'
                  required
                  placeholder='Enter your password shop...'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                {visible ? (
                  <AiOutlineEyeInvisible
                    size={25}
                    className='absolute top-1.5 right-2 cursor-pointer'
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <AiOutlineEye
                    size={25}
                    className='absolute top-1.5 right-2 cursor-pointer'
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
            </div>

            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex} cursor-pointer`}>
                <input
                  type='checkbox'
                  name='remember-me'
                  id='remember-me'
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <Link href='/forgot-password' className='font-medium text-blue-600 hover:text-blue-500'>
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type='submit'
              className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
            >
              Submit
            </button>

            <div className={`${styles.normalFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to='/shop-create' className='text-blue-600 pl-2'>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;
