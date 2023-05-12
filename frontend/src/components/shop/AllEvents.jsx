import { Button } from '@material-ui/core';
import API from 'api';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './Layout/Loader';
import { DataGrid } from '@material-ui/data-grid';
import { toast } from 'react-toastify';
import { backend_url } from 'api/server';

const AllEvents = () => {
  const { seller } = useSelector((state) => state.shop);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllEvent = () => {
    API.get('/event/get-all-events-shop/' + seller._id)
      .then((res) => {
        setLoading(false);
        setEvents(res.data.events);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDeleteEvent = (id) => {
    API.delete('/event/delete-shop-event/' + id)
      .then((res) => {
        getAllEvent();
        toast.success('Delete successfully!');
      })
      .catch((err) => console.log(err.response.data));
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Photo',
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        return <img src={`${backend_url}/${params.row.image}`} className='w-[50px] object-cover' alt='' />;
      },
    },
    { field: 'name', headerName: 'Name', minWidth: 180, flex: 1.4 },
    { field: 'stock', headerName: 'Stock', minWidth: 80, flex: 0.5 },
    { field: 'sold', headerName: 'Sold out', minWidth: 130, flex: 0.6 },
    {
      field: 'preview',
      headerName: 'Preview',
      minWidth: 100,
      flex: 0.8,
      sortable: false,
      type: 'number',
      renderCell: (params) => {
        const slug = params.row.slug;
        return (
          <>
            <Link to={`/product/${slug}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: 'delete',
      flex: 0.8,
      minWidth: 120,
      headerName: 'Delete',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDeleteEvent(params.row.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  events.length > 0 &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.originalPrice,
        stock: item.stock,
        sold: 10,
        slug: item.slug,
        image: item.image,
      });
    });
  // console.log(row, events);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='w-full  bg-white'>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            rowsPerPageOptions={[5, 10]}
          />
        </div>
      )}
    </>
  );
};

export default AllEvents;
