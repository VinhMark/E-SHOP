import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import styles from '../styles/style';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import ProfileContent from '../components/Profile/ProfileContent';

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className='relative items-stretch'>
          <div className='w-[50px] 800px:w-[335px] sticky top-[80px] 800px:top-0'>
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
