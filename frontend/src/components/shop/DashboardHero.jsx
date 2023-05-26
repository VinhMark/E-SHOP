import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from 'react-icons/ai';
import { MdBorderOuter } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrderByShop } from 'redux/actions/order';
import { getAllProductsShop } from 'redux/actions/product';
import styles from 'styles/style';

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.shop);
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);
  const [deliveredOrder, setDeliveredOrder] = useState([]);

  useEffect(() => {
    dispatch(getAllOrderByShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
    const orderData = orders && orders.filter((item) => item.status === 'Delivered');
    setDeliveredOrder(orderData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalEarningWithoutTax = deliveredOrder && deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);
  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharge.toFixed(2);

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWith: 150,
      flex: 0.7,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWith: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered' ? 'text-[green]' : 'text-[red]';
      },
    },
    {
      field: 'itemQty',
      headerName: 'Item Qty',
      type: 'number',
      minWith: 130,
      flex: 0.7,
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWith: 130,
      flex: 0.8,
    },
    {
      field: ' ',
      flex: 1,
      minWith: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.cart.length,
        total: 'US$' + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className='w-full p-8 h-full bg-white'>
      <h3 className='text-[22px] font-Poppins pb-2'>Overview</h3>
      <div className='w-full block 800px:flex items-center justify-between'>
        <div className='w-full flex flex-col mb-4 800px:w-[30%] min-h-[150px] bg-white shadow rounded px-4 py-5'>
          <div className='flex items-center flex-wrap'>
            <AiOutlineMoneyCollect size={20} className='mr-2' fill='#00000085' />
            <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
              Account Balance
            </h3>
            <span className='text-[16px] flex-2 leading-5 !font-[400] text-[#00000085]'>(with 10% service charge)</span>
          </div>

          <h5 className='pt-2 pl-36px text-[22px] font-500'>${availableBalance || 0}</h5>
          <Link to='/dashboard-withdraw-money' className='grow flex items-end'>
            <h5 className='pt-4 text-[#077f9c]'>Withdraw Money</h5>
          </Link>
        </div>

        {/* All order */}
        <div className='w-full flex flex-col mb-4 800px:w-[30%] min-h-[150px] bg-white shadow rounded px-4 py-5'>
          <div className='flex items-center flex-wrap'>
            <MdBorderOuter size={20} className='mr-2' fill='#00000085' />
            <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>All Orders</h3>
          </div>

          <h5 className='pt-2 pl-36px text-[22px] font-500'>{orders && orders.length}</h5>
          <Link to='/dashboard-orders' className='grow flex items-end'>
            <h5 className='pt-4 text-[#077f9c]'>View Orders</h5>
          </Link>
        </div>

        {/* All product */}
        <div className='w-full flex flex-col mb-4 800px:w-[30%] min-h-[150px] bg-white shadow rounded px-4 py-5'>
          <div className='flex items-center flex-wrap'>
            <MdBorderOuter size={20} className='mr-2' fill='#00000085' />
            <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
              All Products
            </h3>
          </div>

          <h5 className='pt-2 pl-36px text-[22px] font-500'>{products && products.length}</h5>
          <Link to='/dashboard-products' className='grow flex items-end'>
            <h5 className='pt-4 text-[#077f9c]'>View Products</h5>
          </Link>
        </div>
      </div>

      <br />
      <h3 className='text-[22px] font-Poppins pb-2'> Latest Orders</h3>
      <div className='w-full min-h-[48vh] bg-white rounded'>
        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
      </div>
    </div>
  );
};

export default DashboardHero;
