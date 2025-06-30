import React from 'react';
import Menu from '../components/space_components/Menu';
import Main from '../components/space_components/Main';
import Suggestion from '../components/space_components/Suggestion';


const Space = () => {
    return (
        <div className='flex justify-between items-start bg-zinc-800 w-full h-screen'>
            <Menu></Menu>
            <Main></Main>
            <Suggestion></Suggestion>
        </div>
    );
}

export default Space;
