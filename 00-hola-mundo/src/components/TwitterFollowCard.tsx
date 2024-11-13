import React from 'react';
import './TwitterFollowCard.css';

export function TwitterFollowCard({username,name,isFollowing}){
    const imagenSrc = `https://avatars.dicebear.com/api/human/${username}.svg`;
    return(
        <article className="article">
            <header className="header">
                <img src={imagenSrc} alt="El avatar de midudev" />
            </header>
            <div className="profile">
                <strong>{name}</strong>
                <span>{username}</span>
            </div>
            <aside className="aside">
                <button>{!isFollowing ? 'Seguir':'No Seguir'}</button>
            </aside>
        </article>
    )
}
export default TwitterFollowCard;