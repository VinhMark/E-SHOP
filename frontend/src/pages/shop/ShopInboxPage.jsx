import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import ShopInbox from 'components/shop/ShopInbox';

const ShopInboxPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={8} />
        </div>
        <div className='w-full justify-center flex'>
          <ShopInbox />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
