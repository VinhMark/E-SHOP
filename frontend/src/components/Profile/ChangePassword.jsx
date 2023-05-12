import API from 'api';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error('Password not matched!');
    }
    API.put('/user/update-password', { oldPassword, newPassword }, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setNewPassword('');
        setOldPassword('');
        setConfirmPassword('');
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  return (
    <div className='w-full px-5'>
      <div className='flex w-full items-center justify-center'>
        <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>Change Password</h1>
      </div>

      <div className='w-full'>
        <form onSubmit={handleChangePassword} className='flex flex-col items-center'>
          <div className='w-full 800px:w-[50%] mt-5'>
            <label htmlFor='oldPassword' className='block p-2'>
              Password
            </label>
            <input
              type='text'
              required
              className='w-full border h-[40px] rounded-[5px] px-2 mx-auto'
              placeholder='Enter your old password'
              id='oldPassword'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className='w-full 800px:w-[50%] mt-5'>
            <label htmlFor='newPassword' className='block p-2'>
              New Password
            </label>
            <input
              type='text'
              required
              className='w-full border h-[40px] rounded-[5px] px-2 mx-auto'
              placeholder='Enter your new password'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='w-full 800px:w-[50%] mt-5'>
            <label htmlFor='confirmPassword' className='block p-2'>
              Confirm Password
            </label>
            <input
              type='text'
              required
              className='w-full border h-[40px] rounded-[5px] px-2 mx-auto'
              placeholder='Enter your confirm password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='w-full 800px:w-[50%] mt-5'>
            <input type='submit' className='w-full h-[40px] border border-[#3a24db]' value='Update' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
