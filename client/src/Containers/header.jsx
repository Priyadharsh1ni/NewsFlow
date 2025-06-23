import React from 'react';
import { BiBookBookmark, BiHome, BiSolidUserCircle } from "react-icons/bi";
import Logo from '../svg/Logo.png'; 

const Header = () => {
    return (
        <header className='header'>
            <div className='logo-container'>
            <img src={Logo} alt={Logo} className='logo' width={40} height={40} />
            <h3 className='logo-text'>NewsFLOW</h3>
            </div>
            
            <nav className='nav'>
                <a href="/dashboard" className='icon-link' title="dashboard">
                    <BiHome size={24} />
                </a>
                <a href="/history" className='icon-link' title="Bookmarks">
                    <BiBookBookmark size={24} />
                </a>
                <a href="/profile" className='icon-link' title="Profile">
                    <BiSolidUserCircle size={24} />
                </a>
            </nav>
        </header>
    );
};


export default Header;