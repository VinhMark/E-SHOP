import styles from 'styles/style';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from 'api';

const initValueForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  zip: '',
  password: '',
};

const ShopCreate = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [shopForm, setShopForm] = useState(initValueForm);

  // handle change all input for form
  const handleChangeInput = (e) => {
    setShopForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(initValueForm);
  };

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('file', avatar);

    for (const [key, value] of Object.entries(shopForm)) {
      formData.append(key, value);
    }

    // Call API
    API.post('/shop/create-shop', formData, config)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg-px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create shop</h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Shop name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={shopForm.name}
                onChange={handleChangeInput}
                required
                placeholder='Enter your shop name'
                className='appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>

            {/* Phone number */}
            <div>
              <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700'>
                Phone phoneNumber
              </label>
              <input
                type='number'
                id='phoneNumber'
                name='phone'
                value={shopForm.phone}
                onChange={handleChangeInput}
                required
                placeholder='Enter your phone number'
                className='appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={shopForm.email}
                onChange={handleChangeInput}
                required
                placeholder='Enter your email'
                className='appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor='address' className='block text-sm font-medium text-gray-700'>
                Address
              </label>
              <input
                type='text'
                id='address'
                name='address'
                value={shopForm.address}
                onChange={handleChangeInput}
                required
                placeholder='Enter your address'
                className='appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>

            {/* Zip code */}
            <div>
              <label htmlFor='zipCode' className='block text-sm font-medium text-gray-700'>
                Zip Code
              </label>
              <input
                type='number'
                id='zipCode'
                name='zip'
                value={shopForm.zip}
                onChange={handleChangeInput}
                required
                placeholder='Enter your zip code'
                className='appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={visible ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={shopForm.password}
                  onChange={handleChangeInput}
                  required
                  placeholder='Enter your password'
                  className='appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                <div className='absolute top-2 right-2'>
                  {visible ? (
                    <AiOutlineEye size={25} onClick={() => setVisible(!visible)} />
                  ) : (
                    <AiOutlineEyeInvisible size={25} onClick={() => setVisible(!visible)} />
                  )}
                </div>
              </div>
            </div>

            {/* Avatar */}
            <div>
              <label htmlFor='avatar' className='block text-sm font-medium text-gray-700'>
                Avatar
              </label>
              <div className='mt-2 font-medium text-sm text-gray-700 flex'>
                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt='avatar'
                      className='h-full w-full object-cover rounded-full'
                    />
                  ) : (
                    <RxAvatar className='w-8 h-8' />
                  )}
                </span>
                <label
                  htmlFor='file-input'
                  className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                >
                  <span>Upload a file</span>
                  <input
                    type='file'
                    name='avatar'
                    onChange={(e) => setAvatar(e.target.files[0])}
                    id='file-input'
                    className='sr-only'
                  />
                </label>
              </div>
            </div>

            {/* button */}
            <div>
              <button
                type='submit'
                className='group relative w-full h-[40px] flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
              >
                Submit
              </button>
            </div>

            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to='/shop-login' className='text-blue-500 pl-2'>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
