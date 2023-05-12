import { Button } from '@material-ui/core';
import API from 'api';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Loader from './Layout/Loader';
import { DataGrid } from '@material-ui/data-grid';
import { toast } from 'react-toastify';
import styles from 'styles/style';
import { RxCross1 } from 'react-icons/rx';
import Store from 'redux/store';
import { getAllProducts } from 'redux/actions/product';

const AllCoupons = () => {
  const { seller } = useSelector((state) => state.shop);
  const { products, isLoading } = useSelector((state) => state.product);

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState({
    name: '',
    value: '',
    minAmount: '',
    maxAmount: '',
  });

  useEffect(() => {
    setLoading(true);
    getAllCoupon();
    Store.dispatch(getAllProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCoupon = () => {
    API.get('/coupon/get-all-coupons-shop/' + seller._id)
      .then((res) => {
        setLoading(false);
        setCoupons(res.data.coupons);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDeleteCoupon = (id) => {
    API.delete('/coupon/delete-coupon/' + id, { withCredentials: true })
      .then((res) => {
        getAllCoupon();
        toast.success('Delete successfully!');
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { ...coupon, shopId: seller._id };
    console.log(formData);
    API.post('/coupon/create-coupon', formData, { withCredentials: true })
      .then((res) => {
        toast.success('Create Coupon successfully!');
        setOpen(false);
        getAllCoupon();
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const columns = [
    { field: 'id', headerName: 'Coupon ID', minWidth: 100, flex: 0.7 },
    { field: 'name', headerName: 'Name', minWidth: 180, flex: 1.4 },
    { field: 'value', headerName: 'Value', minWidth: 80, flex: 0.5 },
    { field: 'minAmount', headerName: 'Min Amount', minWidth: 130, flex: 0.6 },
    { field: 'maxAmount', headerName: 'Max Amount', minWidth: 130, flex: 0.6 },

    {
      field: 'delete',
      flex: 0.8,
      minWidth: 120,
      headerName: 'Delete',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDeleteCoupon(params.row.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  coupons.length > 0 &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        value: item.value,
        minAmount: item.minAmount,
        maxAmount: item.maxAmount,
      });
    });

  return (
    <>
      {loading || isLoading ? (
        <Loader />
      ) : (
        <div className='w-full  bg-white'>
          <div className='w-full flex justify-end'>
            <div className={`${styles.button} m-2 !h-[38px] w-max !rounded-[4px]`} onClick={() => setOpen(!open)}>
              <span className='text-white px-3'>Create Coupon code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            rowsPerPageOptions={[5, 10]}
          />

          {open && (
            <div
              className='fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[2000] flex items-center justify-center'
              onClick={(e) => setOpen(false)}
            >
              <div
                className='flex flex-col w-[90%] 800px:w-[50%] min-h-[80vh] bg-white rounded-md shadow relative p-4'
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className='w-full flex justify-end cursor-pointer'>
                  <RxCross1 size={30} onClick={(e) => setOpen(!open)} />
                </div>
                <h5 className='text-[30px] font-Poppins text-center'>Create Coupon</h5>
                {/* Create coupon code */}
                <CreatePopup coupon={coupon} setCoupon={setCoupon} handleSubmit={handleSubmit} products={products} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const CreatePopup = ({ coupon, setCoupon, handleSubmit, products }) => {
  const [error, setError] = useState({});
  const [hasError, setHasError] = useState(false);

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.hasAttribute('required')) {
      validate(e);
      return;
    }

    setCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();
    console.log(e.target.hasAttribute('required'));
    // Check item empty
    if (value === '') {
      setError((prev) => ({ ...prev, [name]: value === '' ? 'Please enter your coupon ' + name : '' }));
      setHasError(true);
      return false;
    } else {
      setHasError(false);
    }
    return true;
  };

  return (
    <form className='flex flex-col flex-1' onSubmit={!hasError ? handleSubmit : null}>
      <div className='mt-3'>
        <label htmlFor='name'>
          Name: <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='name'
          id='name'
          value={coupon.name}
          onChange={handleChangeInput}
          onBlur={validate}
          required
          className={`mt-2 appearance-none block
          w-full px-2 py-2 border ${
            error?.name ? 'border-[red]' : 'border-gray-500'
          } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500`}
          placeholder='Enter your coupon code name...'
        />
        {error?.name && <span className='text-[red]'>{error.name}</span>}
      </div>

      <div className='mt-3'>
        <label htmlFor='value'>
          Discount Percentage:<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='value'
          id='value'
          value={coupon.value}
          onChange={handleChangeInput}
          onBlur={validate}
          required
          className={`mt-2 appearance-none block
          w-full px-2 py-2 border ${
            error?.value ? 'border-[red]' : 'border-gray-500'
          } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500`}
          placeholder='Enter your coupon code name...'
        />
        {error?.value && <span className='text-[red]'>{error.value}</span>}
      </div>

      <div className='mt-3'>
        <label htmlFor='minAmount'>
          Min Amount:<span className='text-red-500'>*</span>
        </label>
        <input
          type='number'
          name='minAmount'
          id='minAmount'
          value={coupon.minAmount}
          onChange={handleChangeInput}
          onBlur={validate}
          required
          className={`mt-2 appearance-none block
          w-full px-2 py-2 border ${
            error?.minAmount ? 'border-[red]' : 'border-gray-500'
          } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500`}
          placeholder='Enter your min amount...'
        />
        {error?.minAmount && <span className='text-[red]'>{error.minAmount}</span>}
      </div>

      <div className='mt-3'>
        <label htmlFor='maxAmount'>
          Max Amount:<span className='text-red-500'>*</span>
        </label>
        <input
          type='number'
          name='maxAmount'
          id='maxAmount'
          value={coupon.maxAmount}
          onChange={handleChangeInput}
          onBlur={validate}
          required
          className={`mt-2 appearance-none block
          w-full px-2 py-2 border ${
            error?.maxAmount ? 'border-[red]' : 'border-gray-500'
          } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500`}
          placeholder='Enter your max amount...'
        />
        {error?.maxAmount && <span className='text-[red]'>{error.maxAmount}</span>}
      </div>

      <div className='mt-3'>
        <label htmlFor='product'>
          Product:<span className='text-red-500'>*</span>
        </label>
        <select
          name='product'
          id='product'
          onChange={handleChangeInput}
          onBlur={validate}
          required
          className={`mt-2 block
      w-full px-2 py-2 border ${
        error?.product ? 'border-[red]' : 'border-gray-500'
      } rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500`}
        >
          <option value=''>Choose a product</option>
          {products.map((item) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {error?.product && <span className='text-[red]'>{error.product}</span>}
      </div>

      <div className='flex-1 flex items-end'>
        <button type='submit' className={`${styles.button} w-full !rounded-[4px]`}>
          <span className='text-white'>Create</span>
        </button>
      </div>
    </form>
  );
};

export default AllCoupons;
