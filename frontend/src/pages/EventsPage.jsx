import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import EventCard from '../components/Events/EventCard';
import API from 'api';

const EventsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/event/get-all-events').then((res) => setData(res.data.events));
  }, []);

  return (
    <div>
      <Header activeHeading={4} />
      {data.length > 0 && data.map((item) => <EventCard data={item} key={item._id} />)}
    </div>
  );
};

export default EventsPage;
