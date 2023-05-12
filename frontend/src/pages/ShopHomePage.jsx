import ShopInfo from 'components/shop/ShopInfo';
import ShopProfileData from 'components/shop/ShopProfileData';
import React from 'react';
import styles from 'styles/style';

const ShopHomePage = () => {
  return (
    <div className={`${styles.section}bg-[#f5f5f5]`}>
      <div className='w-full flex py-10 justify-between flex-col 800px:flex-row'>
        <div className='w-full 800px:w-[25%] bg-white rounded-[4px] shadow-sm overflow-y-auto h-[90vh] 800px:sticky top-2 left-4 z-10'>
          <ShopInfo isOwner={true} />
        </div>

        <div className='w-full 800px:w-[70%] rounded-[4px]'>
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
