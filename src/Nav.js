import React, { useState, useEffect } from 'react';
import './Nav.css'
function Nav() {
    const [show,handleShow] = useState(false);
    useEffect(()=>{
        const scrollListener=()=>{
            if(window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        };
        window.addEventListener('scroll',scrollListener);
        return()=>{
            window.removeEventListener("scroll",scrollListener);
        };
    },[]);
  return (
    <div className={`nav ${show &&"nav_black"}`}>
        <img className='nav_logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/180px-Logonetflix.png'
        alt='Netflix Logo'
        />
        <img className='nav_avatar'
        src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'
        alt='Netflix Logo'
        />
        
    </div>
  );
}

export default Nav