import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import API from 'api';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/order/get-all-order-refund-user/' + user._id)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((error) => toast.error(error.response.data.message));
  }, [user]);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Refund Success' ? 'text-[green]' : 'text-[red]';
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
          <Link to={`/user/order/${params.id}`}>
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
        itemQty: item.cart.length,
        total: 'US$ ' + item.totalPrice,
        status: item.status,
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

export default AllRefundOrders;
