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

const AllProducts = () => {
  const { seller } = useSelector((state) => state.shop);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllProduct = () => {
    API.get('/product/get-all-products-shop/' + seller._id)
      .then((res) => {
        setLoading(false);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDeleteProduct = (id) => {
    API.delete('/product/delete-shop-product/' + id)
      .then((res) => {
        getAllProduct();
        toast.success('Delete successfully!');
      })
      .catch((err) => console.log(err.response.data));
  };

  const columns = [
    {
      field: 'photo',
      headerName: 'Photo',
      minWidth: 100,
      flex: 0.7,
      renderCell: (params) => {
        return <img src={`${backend_url}/${params.row.photo}`} className='w-[50px] object-cover' alt='' />;
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
            <Button onClick={() => handleDeleteProduct(params.row.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  products.length > 0 &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.originalPrice,
        stock: item.stock,
        sold: 10,
        slug: item.slug,
        photo: item.images[0],
      });
    });
  console.log(row, products);
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

export default AllProducts;
