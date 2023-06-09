import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'styles/style';
import Store from 'redux/store';
import { loadUser } from 'redux/actions/user';
import API from 'api';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/user/login', user, { withCredentials: true })
      .then(() => {
        toast.success('login success');
        // Get data user
        Store.dispatch(loadUser());
        navigate('/');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Login to your account</h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <div className='mt-1'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  required
                  className='appearance-none block w-full px-3 py-2 border
                   border-gray-300 rounded-md placeholder-gray-400
                    focus:outline-none focus:ring-blue-500 sm:text-sm'
                  value={user.email}
                  onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1 relative'>
                <input
                  type={visible ? 'text' : 'password'}
                  name='password'
                  id='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none block w-full px-3 py-2 border
                   border-gray-300 rounded-md placeholder-gray-400
                    focus:outline-none focus:ring-blue-500 sm:text-sm'
                  value={user.password}
                  onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                />
                {!visible ? (
                  <AiOutlineEye
                    size={25}
                    className='absolute right-2 top-2 cursor-pointer'
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={25}
                    className='absolute right-2 top-2 cursor-pointer'
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
            </div>

            {/* Remember and forgot password */}
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type='checkbox'
                  name='remember-me'
                  id='remember-me'
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-gray-900'>
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <Link to='#' className='font-medium text-blue-500 hover:text-blue-600'>
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Button submit */}
            <div>
              <button
                type='submit'
                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
              >
                Submit
              </button>
            </div>

            <div className={`${styles.normalFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to='/sign-up' className='text-blue-600 pl-2'>
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
