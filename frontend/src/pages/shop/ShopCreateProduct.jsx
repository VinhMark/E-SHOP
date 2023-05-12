import CreateProduct from 'components/shop/CreateProduct';
import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import React from 'react';

const ShopCreateProduct = () => {
  return (
    <div>
      <DashBoardHeader />

      <div className='flex items-center justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={4} />
        </div>

        <div className='w-full justify-center flex'>
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
