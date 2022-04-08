import React from 'react';
import Games from './Games';
import HomePage from './HomePage';
import { useSelector } from 'react-redux';

function Home(props) {
  const { value:user } = useSelector(state => state.user);
	return (
		<>
      {user.id?
        <Games />
        :
        <HomePage />
      }
		</>
	);
}

export default Home;
