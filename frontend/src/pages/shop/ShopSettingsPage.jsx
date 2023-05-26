import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import ShopSettings from 'components/shop/ShopSettings';

const ShopSettingsPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={11} />
        </div>
        <div className='w-full justify-center flex'>
          <ShopSettings />
        </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;
