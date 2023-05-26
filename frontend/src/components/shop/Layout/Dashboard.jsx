import { Outlet, useLocation } from 'react-router-dom';
import DashBoardHeader from './DashBoardHeader';
import DashboardSidebar from './DashboardSidebar';

const Dashboard = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full '>
        <div className='relative bg-white border-r'>
          <div className='w-[80px] 800px:w-[330px] sticky top-[80px]'>
            <DashboardSidebar active={pathname.split('/')[2]} />
          </div>
        </div>
        <div className='w-full justify-center flex overflow-x-hidden min-h-[calc(100vh-80px)]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
