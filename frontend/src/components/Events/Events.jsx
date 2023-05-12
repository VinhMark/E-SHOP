import React, { useEffect, useState } from 'react';
import styles from 'styles/style';
import EventCard from './EventCard';
import API from 'api';

const Events = () => {
  const [data, setData] = useState();

  useEffect(() => {
    API.get('/event/get-all-events').then((res) => setData(res.data.events[0]));
  }, []);

  return (
    <div className={`${styles.section} mb-12`}>
      <div className={`${styles.heading}`}>
        <h1>Popular Events</h1>
      </div>

      <div className='w-full grid'>{data && <EventCard data={data} />}</div>
    </div>
  );
};

export default Events;
