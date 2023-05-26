import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrderByUser } from 'redux/actions/order';

const UserAllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderByUser(user._id));
  }, [dispatch, user]);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered' ? 'text-[green]' : 'text-[red]';
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

export default UserAllOrders;
