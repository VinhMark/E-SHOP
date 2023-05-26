import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrderByShop } from 'redux/actions/order';
import Loader from './Layout/Loader';
import { DataGrid } from '@material-ui/data-grid';

const AllRefundOrders = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderByShop(seller._id));
  }, [dispatch, seller]);

  const refundOrders =
    orders && orders.filter((i) => i.status === 'Processing Refund' || i.status === 'Refund Success');

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

  refundOrders &&
    refundOrders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.cart.length,
        total: 'US$' + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='w-full bg-white'>
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
      )}
    </>
  );
};

export default AllRefundOrders;
