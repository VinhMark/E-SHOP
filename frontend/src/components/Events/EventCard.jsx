import styles from '../../styles/style';
import CountDown from './CountDown';

const EventCard = ({ active }) => {
  return (
    <div className={`w-full block bg-white rounded-lg ${active ? 'unset' : 'mb-12'} lg:flex p-2`}>
      {/* side left */}
      <div className='w-full lg:w-[50%] m-auto'>
        <img src='https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg' alt='' />
      </div>

      {/* side right */}
      <div className='w-full lg:w-[50%] flex flex-col justify-center'>
        <h2 className={`${styles.productTitle}`}>Iphone 14 pro max 8/256gb</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum at quidem cum earum inventore eaque error
          laudantium impedit ab dolorem cumque, vitae recusandae illo fuga saepe incidunt enim sequi eos? Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Nostrum at quidem cum earum inventore eaque error laudantium
          impedit ab dolorem cumque, vitae recusandae illo fuga saepe incidunt enim sequi eos?
        </p>

        <div className='flex py-2 justify-between'>
          {/* Price */}
          <div className='flex'>
            <h5 className='font-[500] text-[18px] text-[#d55b45] pr-3 line-through'>1099$</h5>
            <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>999$</h5>
          </div>
          {/* total sell */}
          <span className='pr-3 font-[500] text-[17px] text-[#44a55e]'>120 Sold</span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
