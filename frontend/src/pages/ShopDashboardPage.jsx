import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';

const ShopDashboardPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex items-center justify-between w-full'>
        <div className='w-[100px] 800px:w-[330px]'>
          <DashboardSidebar active={1} />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
