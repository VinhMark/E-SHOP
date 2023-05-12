import React from 'react';
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingCart } from 'react-icons/hi';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Store from 'redux/store';
import { clearUser } from 'redux/actions/user';
import API from 'api';

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    API.get('/user/logout', { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        Store.dispatch(clearUser());
        navigate('/login');
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 font-[500]'>
      {/* item menu */}
      <div
        onClick={() => setActive(1)}
        className={`flex items-center cursor-pointer w-full mb-8 ${active === 1 && 'text-[red]'}`}
      >
        <RxPerson size={20} />
        <span className='pl-3 hidden 800px:block'>Profile</span>
      </div>

      {/* item menu */}
      <div
        onClick={() => setActive(2)}
        className={`flex items-center cursor-pointer  w-full mb-8 ${active === 2 && 'text-[red]'}`}
      >
        <HiOutlineShoppingCart size={20} />
        <span className='pl-3 hidden 800px:block'>Orders</span>
      </div>

      {/* item menu */}
      <div
        onClick={() => setActive(3)}
        className={`flex items-center cursor-pointer  w-full mb-8 ${active === 3 && 'text-[red]'}`}
      >
        <HiOutlineReceiptRefund size={20} />
        <span className='pl-3 hidden 800px:block'>Refunds</span>
      </div>

      {/* item menu */}
      <div
        onClick={() => setActive(4) || navigate('/inbox')}
        className={`flex items-center cursor-pointer  w-full mb-8 ${active === 4 && 'text-[red]'}`}
      >
        <AiOutlineMessage size={20} />
        <span className='pl-3 hidden 800px:block'>Inbox</span>
      </div>

      {/* item menu */}
      <div
        onClick={() => setActive(5)}
        className={`flex items-center cursor-pointer  w-full mb-8 ${active === 5 && 'text-[red]'}`}
      >
        <MdOutlineTrackChanges size={20} />
        <span className='pl-3 hidden 800px:block'>Track order</span>
      </div>

      {/* item menu */}
      <div
        onClick={() => setActive(6)}
        className={`flex items-center cursor-pointer  w-full mb-8 ${active === 6 && 'text-[red]'}`}
      >
        <AiOutlineCreditCard size={20} />
        <span className='pl-3 hidden 800px:block'>Update Password</span>
      </div>

      {/* item menu */}
      <div
        onClick={() => setActive(7)}
        className={`flex items-center cursor-pointer  w-full mb-8 ${active === 7 && 'text-[red]'}`}
      >
        <TbAddressBook size={20} />
        <span className='pl-3 hidden 800px:block'>Address</span>
      </div>

      {/* item menu */}
      <div
        onClick={() => setActive(8) || handleLogout()}
        className={`flex items-center cursor-pointer w-full ${active === 8 && 'text-[red]'}`}
      >
        <AiOutlineLogin size={20} />
        <span className='pl-3 hidden 800px:block'>Log out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
