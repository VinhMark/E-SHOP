import styles from 'styles/style';
import CountDown from './CountDown';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from 'redux/actions/cart';

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const itemExists = cart.length > cart.find((i) => i._id === data._id);
    if (itemExists) {
      toast.warning('Item already in cart!');
    } else {
      if (data.stock < 1) {
        toast.error('Product stock limit!');
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success('Item added to cart successfully!');
      }
    }
  };

  return (
    <div className={`w-full block bg-white rounded-lg ${active ? 'unset' : 'mb-12'} lg:flex p-2`}>
      {/* side left */}
      <div className='w-full lg:w-[50%] m-auto'>
        <img src='https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg' alt='' />
      </div>

      {/* side right */}
      <div className='w-full lg:w-[50%] flex flex-col justify-center'>
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p>{data.description}</p>

        <div className='flex py-2 justify-between'>
          {/* Price */}
          <div className='flex'>
            <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>${data.originalPrice}</h5>
            <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>${data.discountPrice}</h5>
          </div>
          {/* total sell */}
          <span className='pr-3 font-[500] text-[17px] text-[#44a55e]'>{data.sold_out} (Sold)</span>
        </div>
        <CountDown endDate={data.endDate} />
        <br />
        <div className='flex gap-5'>
          <Link className={`${styles.button} text-white`} to={`/product/${data.slug}?isEvent=true`}>
            See Details
          </Link>
          <div className={`${styles.button} text-white`} onClick={() => handleAddToCart()}>
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
