import React, { useContext } from 'react';
import spaceContext from '../../context/SpaceContext';

// Import your components here
import Home from '../main_components/Home';
import Followers from '../main_components/Followers';
import Following from '../main_components/Following';
import Profile from '../main_components/Profile';
import Posts from '../main_components/Posts';
import Notifications from '../main_components/Notifications';

const Main = () => {
  const [main_space, setMain_Sate] = useContext(spaceContext);

  return (
    <div className='bg-zinc-800 w-[55%] px-2'>
      {main_space === "Home" && <Home />}
      {main_space === "Followers" && <Followers />}
      {main_space === "Following" && <Following />}
      {main_space === "Profile" && <Profile />}
      {main_space === "Posts" && <Posts />}
      {main_space === "Notifications" && <Notifications />}
    </div>
  );
};

export default Main;