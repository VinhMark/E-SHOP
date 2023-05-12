import API from 'api';
import ProductCard from 'components/Route/ProductCard/ProductCard';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'styles/style';

const ShopProfileData = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.shop);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    API.get('/product/get-all-products-shop/' + seller._id)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, [seller._id]);

  return (
    <div className='w-full'>
      {/* Tab header */}
      <div className='w-full flex items-center justify-between flex-wrap mt-8 800px:mt-0'>
        <div className='flex items-center '>
          <div className='flex items-center'>
            <h5
              onClick={() => setActive(1)}
              className={`font-[600] 800px:text-[20px] text-md ${
                active === 1 ? 'text-[red]' : 'text-[#333]'
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>

          <div className='flex items-center'>
            <h5
              onClick={() => setActive(2)}
              className={`font-[600] 800px:text-[20px] text-md ${
                active === 2 ? 'text-[red]' : 'text-[#333]'
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>

          <div className='flex items-center'>
            <h5
              onClick={() => setActive(3)}
              className={`font-[600]  800px:text-[20px] text-md ${
                active === 3 ? 'text-[red]' : 'text-[#333]'
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        {/* Button right header */}
        <div>
          {isOwner && (
            <Link to='/dashboard' className={`${styles.button} !rounded-[4px] !h-[42px]`}>
              <span className='text-white'>Go Dashboard</span>
            </Link>
          )}
        </div>
      </div>

      {/* Tab content */}
      <div className='mt-5 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-t'>
        {products.length > 0 && products.map((i, index) => <ProductCard data={i} key={index} isShop={true} />)}
      </div>
    </div>
  );
};

export default ShopProfileData;
