import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import ShopWithdrawMoney from 'components/shop/ShopWithdrawMoney';

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={7} />
        </div>
        <div className='w-full justify-center flex'>
          <ShopWithdrawMoney />
        </div>
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;
