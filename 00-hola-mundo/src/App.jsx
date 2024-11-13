import React from 'react';
import './App.css';
import TwitterFollowCard from './components/TwitterFollowCard';

export function App(){
    return(
        <>
        <TwitterFollowCard name='@Carsico' isFollowingusername={'@Carsico'}/>
        <TwitterFollowCard name='@Carlos' isFollowing={false} username={'@carlos'}/>
        <TwitterFollowCard name='@Maria' isFollowing={false} username={'@Carsico'}/>
        <TwitterFollowCard name='@Luis' isFollowing username={'@Carsico'}/>
        </>
    

    )
}
export default App;