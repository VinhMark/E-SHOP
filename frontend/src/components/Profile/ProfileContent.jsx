import React, { useState } from 'react';
import { backend_url } from '../../server';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineTrackChanges } from 'react-icons/md';
import styles from '../../styles/style';
import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const ProfileContent = ({ active }) => {
  const { user, loading } = useSelector((state) => state.user);
  const [userForm, setUserForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <span>Loading....</span>;
  }

  return (
    <div className='w-full'>
      {/* Profile page */}
      {active === 1 && (
        <div className='flex justify-center w-full flex-wrap'>
          <div className='relative'>
            <img
              src={`${backend_url}${user?.avatar}`}
              className='h-[150px] w-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
              alt=''
            />
            <div className='absolute bottom-[5px] right-[5px] w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer'>
              <AiOutlineCamera />
            </div>
          </div>

          <div className='w-full px-5 mt-12'>
            <form onSubmit={handleSubmit}>
              <div className='w-full flex pb-3'>
                {/* Full name input */}
                <div className='w-[50%]'>
                  <label className='block pb-2'>Full Name</label>
                  <input
                    type='text'
                    className={`${styles.input} !w-[95%]`}
                    value={user?.name}
                    onChange={(e) => setUserForm((pre) => ({ ...pre, name: e.target.value }))}
                    required
                  />
                </div>

                {/* Email input */}
                <div className='w-[50%]'>
                  <label className='block pb-2'>Email</label>
                  <input
                    type='email'
                    className={`${styles.input}`}
                    required
                    value={user?.email}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <div className='w-full flex pb-3'>
                {/* Phone number input */}
                <div className='w-[50%]'>
                  <label className='block pb-2'>Phone Number</label>
                  <input
                    type='text'
                    className={`${styles.input} !w-[95%]`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                {/* Email input */}
                <div className='w-[50%]'>
                  <label className='block pb-2'>Zip Code</label>
                  <input
                    type='text'
                    className={`${styles.input}`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className='w-full flex pb-3'>
                {/* Address 1 input */}
                <div className='w-[50%]'>
                  <label className='block pb-2'>Address 1</label>
                  <input
                    type='text'
                    className={`${styles.input} !w-[95%]`}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    required
                  />
                </div>

                {/* Address 2 input */}
                <div className='w-[50%]'>
                  <label className='block pb-2'>Address 2</label>
                  <input
                    type='text'
                    className={`${styles.input}`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>

              {/* button */}
              <input
                type='submit'
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:bg-[#3a24db] hover:text-white transition duration-300`}
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
      {active === 6 && <PaymentMethod />}

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

const PaymentMethod = () => {
  return (
    <div className='w-full px-5'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>Payment Method</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className='text-white'>Add New</span>
        </div>
      </div>
      <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
        <div className='flex items-center'>
          <img src='https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg' alt='' />
          <h5 className='pl-5 font-[600]'>Van Vinh</h5>
        </div>

        <div className='pl-8 flex items-center'>
          <h6>1234 ***** *****</h6>
          <span className='px-3'>|</span>
          <h5> 08/2023</h5>
        </div>

        <div className='min-w-[10%] flex items-center justify-between pl-8'>
          <AiOutlineDelete size={25} className='cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className='w-full px-5'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-[25px] font-[600] text-[#00000ba] pb-2'>My Address</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className='text-white'>Add new</span>
        </div>
      </div>

      <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center justify-between px-3 shadow pr-10'>
        <h5 className='pl-5 font-[600]'>Default</h5>
        <AiOutlineDelete size={25} className='cursor-pointer' />
      </div>
    </div>
  );
};

export default ProfileContent;
