import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

const Ratings = ({ ratings }) => {
  const starts = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= ratings) {
      starts.push(<AiFillStar size={20} color='#f6b100' key={i} className='mr-2 cursor-pointer' />);
    } else if (i === Math.ceil(ratings) && !Number.isInteger(ratings)) {
      starts.push(<BsStarHalf size={20} color='#f6b100' key={i} className='mr-2 cursor-pointer' />);
    } else {
      starts.push(<AiOutlineStar size={20} color='#f6b100' key={i} className='mr-2 cursor-pointer' />);
    }
  }
  return <div className='flex'>{starts}</div>;
};

export default Ratings;
