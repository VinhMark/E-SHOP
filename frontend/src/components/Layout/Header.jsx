import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from 'styles/style';
import { categoriesData, productData } from 'static/data';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import DropDown from './DropDown';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { backend_url } from 'api/server';
import Cart from '../Cart';
import Wishlist from '../WishList/Wishlist';
import { RxCross1 } from 'react-icons/rx';

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [active, setActive] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowSearch(true);

    const filterProducts =
      productData &&
      productData.filter((product) => {
        return product.name.toLowerCase().includes(term.toLowerCase());
      });
    setSearchData(filterProducts);
  };

  const handleFocusInputSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value !== '') {
      setShowSearch(true);
    }
  };

  const handleCloseSearch = () => {
    console.log('remove');
    setShowSearch(false);
    setSearchTerm('');
    setSearchData(null);
  };

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Nav-top */}
      <div className={`${styles.section}`}>
        <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
          <div>
            <Link to='/'>
              <img src='https://shopo.quomodothemes.website/assets/images/logo.svg' alt='' />
            </Link>
          </div>
          {/* Search box */}
          <div className='w-[50%] relative'>
            <input
              type='text'
              placeholder='Search Product...'
              value={searchTerm}
              onChange={(e) => handleSearchChange(e)}
              onFocus={handleFocusInputSearch}
              className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
            />
            {searchTerm ? (
              <RxCross1
                size={30}
                className='absolute right-2 top-1.5 cursor-pointer'
                onClick={() => handleCloseSearch()}
              />
            ) : (
              <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer' />
            )}
            {searchData && searchData.length !== 0 && showSearch ? (
              <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const Product_name = d.replace(/\s+/g, '-');

                    return (
                      <Link to={`/product/${Product_name}`} key={index} onClick={() => setShowSearch(false)}>
                        <div className='w-full flex items-start py-3'>
                          <img src={i.image_Url[0].url} alt='' className='w-[40px] h-[40px] mr-[10px]' />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* button right */}
          <div className={`${styles.button}`}>
            <Link to='/shop-create'>
              <h1 className='text-white flex items-center'>
                Become Seller <IoIosArrowForward />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav-bottom */}
      <div
        className={`${active ? 'shadow-sm fixed top-0 left-0 z-10' : ''}
          transition hidden 800px:flex items-center justify-between w-full
         bg-[#3321c8] h-[70px]`}
      >
        <div className={`${styles.section} relative ${styles.normalFlex} justify-between`}>
          {/* categories */}
          <div onClick={() => setDropdown(!dropdown)}>
            <div className='relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block'>
              <BiMenuAltLeft size={30} className='absolute top-4 left-2' />

              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>

              <IoIosArrowDown size={20} className='absolute right-2 top-5 cursor-pointer' />
              {dropdown && <DropDown categoriesData={categoriesData} setDropdown={setDropdown} />}
            </div>
          </div>
          {/* Nav items */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className={`${styles.normalFlex}`}>
            <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenWishList(true)}>
              <AiOutlineHeart size={30} color='rgb(255 255 255/ 83%)' />
              <span
                className='absolute right-[-5px] top-0 rounded-full
               bg-[#b3c177] w-4 h-4 top right p-0 m-0 text-white 
               font-mono text-[12px] leading-tight text-center'
              >
                0
              </span>
            </div>
            <div className='relative cursor-pointer mr-[15px]' onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} color='rgb(255 255 255/ 83%)' />
              <span
                className='absolute right-[-5px] top-0 rounded-full
               bg-[#b3c177] w-4 h-4 top right p-0 m-0 text-white 
               font-mono text-[12px] leading-tight text-center'
              >
                0
              </span>
            </div>
            <div className='relative cursor-pointer mr-[15px]'>
              {isAuthenticated ? (
                <Link to='/profile'>
                  <img
                    src={`${backend_url}${user.avatar}`}
                    alt=''
                    className='w-[35px] h-[35px] rounded-full object-cover'
                  />
                </Link>
              ) : (
                <Link to='/login'>
                  <CgProfile size={30} color='rgb(255 255 255/ 83%)' />
                </Link>
              )}
            </div>

            {/* Cart popup */}
            {openCart && <Cart setOpenCart={setOpenCart} />}

            {/* wishlist popup */}
            {openWishList && <Wishlist setOpenWishList={setOpenWishList} />}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div className='w-full h-[70px] fixed bg-white z-50 top-0 left-0 shadow-sm 800px:hidden'>
        <div className='w-full flex items-center justify-between'>
          <BiMenuAltLeft size={40} className='ml-4' onClick={() => setOpen(!open)} />
          <Link to='/'>
            <img
              src='https://shopo.quomodothemes.website/assets/images/logo.svg'
              className='mt-5 cursor-pointer'
              alt=''
            />
          </Link>
          <div className='relative mr-[20px]'>
            <AiOutlineShoppingCart size={30} />
            <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white flex items-center justify-center'>
              1
            </span>
          </div>
        </div>

        {/* header sidebar */}
        {open && (
          <div className='fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0'>
            <div className='fixed w-[60%] bg-white h-screen top-0 left-0 z-10 overflow-y-auto'>
              {/* Header menu */}
              <div className='w-full justify-between flex pr-3'>
                <div>
                  <div className='relative mr-[15px]'>
                    <AiOutlineHeart size={30} className='mt-5 ml-3' />
                    <span className='absolute top-0 right-0 bg-[#3bc177] text-white rounded-full w-4 h-4 flex items-center justify-center'>
                      0
                    </span>
                  </div>
                </div>
                {/* Button close popup */}
                <RxCross1 size={30} className='ml-4 mt-5' onClick={() => setOpen(!open)} />
              </div>

              <div className='my-8 w-[92%] m-auto h-[40px]'>
                <input
                  type='text'
                  className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
                  placeholder='Search Product...'
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e)}
                />

                {searchData && (
                  <div className='absolute bg-white z-10 shadow w-[92%] p-3'>
                    {searchData.map((product, index) => {
                      const d = product.name;
                      const productName = d.replace(/\s+/g, '-');
                      return (
                        <Link to={`/product/${productName}`}>
                          <div key={index} className='flex items-center p-2'>
                            <img src={product.image_Url[0].url} alt='' className='w-[50px] mr-2' />
                            <h5>{product.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading} />
              {/* button seller */}
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to='/shop-create'>
                  <h1 className='text-white flex items-center'>
                    Become Seller <IoIosArrowForward className='ml-1' />
                  </h1>
                </Link>
              </div>
              {/* button login */}
              <div className='flex w-full justify-center text-[18px] text-[#000000b7] mt-12'>
                {isAuthenticated ? (
                  <Link to='/profile'>
                    <img
                      src={`${backend_url}${user.avatar}`}
                      alt=''
                      className='w-[60px] h-[60px] rounded-full object-cover border-[3px] border-[#17dd1f]'
                    />
                  </Link>
                ) : (
                  <>
                    <Link to='/login' className='pr-[10px]'>
                      Login /
                    </Link>
                    <Link to='/sign-up'>Sign up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
