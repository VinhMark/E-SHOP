import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineTrackChanges } from 'react-icons/md';
import styles from 'styles/style';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { backend_url } from 'api/server';
import { updateAvatarUser, updateUser } from 'redux/actions/user';
import Loader from 'components/shop/Layout/Loader';
import { toast } from 'react-toastify';
import Address from './Address';
import ChangePassword from './ChangePassword';

const ProfileContent = ({ active }) => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userForm, setUserForm] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

  console.log(user.avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ClearError' });
    const newUser = { ...user, ...userForm };
    dispatch(updateUser(newUser));
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateAvatar = (e) => {
    const formData = new FormData();
    dispatch({ type: 'ClearError' });
    formData.append('image', e.target.files[0]);
    dispatch(updateAvatarUser(formData));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='w-full'>
      {/* Profile page */}
      {active === 1 && (
        <div className='flex justify-center w-full flex-wrap'>
          <div className='relative'>
            <img
              src={`${backend_url}${user.avatar}`}
              className='h-[150px] w-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
              alt=''
            />
            <div className='absolute bottom-[5px] right-[5px] w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer'>
              <input type='file' id='avatar' className='hidden' onChange={(e) => handleUpdateAvatar(e)} />
              <label htmlFor='avatar' className='cursor-pointer'>
                <AiOutlineCamera />
              </label>
            </div>
          </div>

          <div className='w-full px-5 mt-12'>
            <form onSubmit={handleSubmit}>
              <div className='w-full flex pb-3 flex-wrap'>
                {/* Full name input */}
                <div className='w-full 800px:w-[50%] pb-3'>
                  <label className='block pb-2 font-bold'>Full Name</label>
                  <input
                    type='text'
                    name='name'
                    className={`${styles.input} !w-[95%]`}
                    value={userForm.name}
                    onChange={(e) => handleChangeInput(e)}
                    required
                  />
                </div>

                {/* Email input */}
                <div className='w-full 800px:w-[50%]'>
                  <label className='block pb-2 font-bold'>Email</label>
                  <input
                    type='email'
                    name='email'
                    className={`${styles.input}`}
                    required
                    value={userForm.email}
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
              </div>
              <div className='w-full flex pb-3 flex-wrap'>
                {/* Phone number input */}
                <div className='w-full 800px:w-[50%] pb-3'>
                  <label className='block pb-2 font-bold'>Phone Number</label>
                  <input
                    type='text'
                    name='phone'
                    className={`${styles.input} !w-[95%]`}
                    value={userForm.phone}
                    onChange={(e) => handleChangeInput(e)}
                    required
                  />
                </div>
                {/* Phone number input */}
                <div className='w-full 800px:w-[50%] pb-3'>
                  <label className='block pb-2 font-bold'>Password</label>
                  <input
                    type='password'
                    name='password'
                    className={`${styles.input} !w-[95%]`}
                    value={userForm.password}
                    onChange={(e) => handleChangeInput(e)}
                    required
                  />
                </div>
              </div>

              {/* button */}
              <input
                type='submit'
                className={`w-full 800px:w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:bg-[#3a24db] hover:text-white transition duration-300`}
                value='Update'
              />
            </form>
          </div>
        </div>
      )}

      {/* order page */}
      {active === 2 && (
        <div className='pl-8 pt-1 overflow-hidden'>
          <AllOrders />
        </div>
      )}

      {/* refund page */}
      {active === 3 && (
        <div className='pl-8 pt-1 overflow-hidden'>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div className='pl-8 pt-1 overflow-hidden'>
          <TrackOrder />
        </div>
      )}

      {/* Payment method order */}
      {active === 6 && <ChangePassword />}

      {/* User address page */}
      {active === 7 && (
        <div className='pl-8 pt-1 overflow-hidden'>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: 'asdaskjldno090232',
      orderItems: [{ name: 'Iphone 14 pro max' }],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      callClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    { field: 'itemQty', headerName: 'Item Qty', type: 'number', minWidth: 130, flex: 0.7 },
    { field: 'total', headerName: 'Total', type: 'number', minWidth: 150, flex: 0.7 },
    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      align: 'right',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) =>
      row.push({
        id: item._id,
        itemQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      })
    );

  return (
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5, 10]}
      disableSelectionOnClick
      autoHeight
    />
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: 'asdaskjldno090232',
      orderItems: [{ name: 'Iphone 14 pro max' }],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      callClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    { field: 'itemQty', headerName: 'Item Qty', type: 'number', minWidth: 130, flex: 0.7 },
    { field: 'total', headerName: 'Total', type: 'number', minWidth: 150, flex: 0.7 },
    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      align: 'right',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) =>
      row.push({
        id: item._id,
        itemQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      })
    );

  return (
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5, 10]}
      disableSelectionOnClick
      autoHeight
    />
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: 'asdaskjldno090232',
      orderItems: [{ name: 'Iphone 14 pro max' }],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      callClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered' ? 'greenColor' : 'redColor';
      },
    },
    { field: 'itemQty', headerName: 'Item Qty', type: 'number', minWidth: 130, flex: 0.7 },
    { field: 'total', headerName: 'Total', type: 'number', minWidth: 150, flex: 0.7 },
    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      align: 'right',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <MdOutlineTrackChanges size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) =>
      row.push({
        id: item._id,
        itemQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      })
    );

  return (
    <DataGrid
      rows={row}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5, 10]}
      disableSelectionOnClick
      autoHeight
    />
  );
};
export default ProfileContent;
