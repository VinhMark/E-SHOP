import Header from '../components/Layout/Header';
import styles from '../styles/style';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import { Outlet, useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-5 gap-5`}>
        <div className='relative items-stretch'>
          <div className='w-[50px] 800px:w-[335px] sticky top-[80px] 800px:top-0'>
            <ProfileSidebar path={pathname.split('/')[2] || ''} />
          </div>
        </div>
        <div className='bg-white rounded-lg w-full p-5 min-h-[calc(100vh-100px)] 800px:min-h-[calc(100vh-200px)] 800px:mt-0 mt-[40px]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
