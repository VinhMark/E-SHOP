import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import styles from 'styles/style';
import { toast } from 'react-toastify';
import API from 'api';

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeInput = (e) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      setUser((prev) => ({ ...prev, [e.target.name]: file }));
      return;
    }
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const newForm = new FormData();
    newForm.append('file', user.avatar);
    newForm.append('name', user.fullName);
    newForm.append('password', user.password);
    newForm.append('email', user.email);
    API.post('/user/create-user', newForm, config)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Register as new user</h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            {/* Full name */}
            <div>
              <label htmlFor='fullName' className='block text-sm font-medium text-gray-700'>
                Full Name
              </label>
              <div className='mt-1'>
                <input
                  type='text'
                  name='fullName'
                  id='fullName'
                  autoComplete='fullName'
                  required
                  className='appearance-none block w-full px-3 py-2 border
                   border-gray-300 rounded-md placeholder-gray-400
                    focus:outline-none focus:ring-blue-500 sm:text-sm'
                  value={user.fullName}
                  onChange={(e) => changeInput(e)}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email Address
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
                  onChange={(e) => changeInput(e)}
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
                  onChange={(e) => changeInput(e)}
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

            {/* Avatar */}
            <div>
              <label htmlFor='avatar' className='block text-sm font-medium text-gray-700'></label>
              <div className='mt-2 flex items-center'>
                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                  {user.avatar ? (
                    <img
                      src={URL.createObjectURL(user.avatar)}
                      alt=''
                      className='w-full h-full object-cover object-center'
                    />
                  ) : (
                    <RxAvatar className='w-8 h-8' />
                  )}
                </span>
                <label
                  htmlFor='file-input'
                  className='ml-5 items-center justify-center px-4 py-2
                   border border-gray-300 rounded-md shadow-sm 
                   text-sm font-medium text-gray-700 bg-white
                    hover:bg-gray-50'
                >
                  <span>Upload a file</span>
                  <input
                    type='file'
                    name='avatar'
                    id='file-input'
                    accept='.jpg,.jpeg,.png'
                    className='sr-only'
                    onChange={(e) => changeInput(e)}
                  />
                </label>
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

            <div className={`${styles.normalFlex} w-full  font-medium`}>
              <h4>Already an account?</h4>
              <Link to='/login' className='text-blue-600 pl-2'>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
