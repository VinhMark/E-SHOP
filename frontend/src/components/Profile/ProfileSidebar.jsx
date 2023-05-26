import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingCart } from 'react-icons/hi';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { RxPerson } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Store from 'redux/store';
import { clearUser } from 'redux/actions/user';
import API from 'api';

const urlPath = [
  { title: 'Profile', path: '', icon: <RxPerson size={20} /> },
  { title: 'Orders', path: 'orders', icon: <HiOutlineShoppingCart size={20} /> },
  { title: 'Refunds', path: 'refunds', icon: <HiOutlineReceiptRefund size={20} /> },
  { title: 'Inbox', path: 'inboxes', icon: <AiOutlineMessage size={20} /> },
  { title: 'Track order', path: 'track', icon: <MdOutlineTrackChanges size={20} /> },
  { title: 'Update Password', path: 'update-password', icon: <AiOutlineCreditCard size={20} /> },
  { title: 'Address', path: 'addresses', icon: <TbAddressBook size={20} /> },
];

const ProfileSidebar = ({ path }) => {
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
      {urlPath.map((item, index) => (
        <Link
          key={index}
          to={`/user/${item.path}`}
          className={`flex items-center cursor-pointer ${
            item.path === path && '!bg-[#3321c8] text-white'
          } w-full mb-8 800px:mb-0 800px:py-4 800px:px-2 hover:bg-gray-200`}
        >
          {item.icon}
          <span className='pl-3 hidden 800px:block'>{item.title}</span>
        </Link>
      ))}

      {/* item menu */}
      <div
        className={`flex items-center cursor-pointer w-full mb-8 800px:py-4 800px:px-2 hover:bg-gray-200`}
        onClick={() => handleLogout()}
      >
        <AiOutlineLogin size={20} />
        <span className='pl-3 hidden 800px:block'>Log out</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
