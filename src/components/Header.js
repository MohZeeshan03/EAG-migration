import React from 'react';
import logoImg from '../assets/logo.png';
import icon from '../assets/icon.png'
import Connect from './ConnectButton';

export default function Header() {
    return (
        <>
             <header className="sl-container flex justify-between items-center">
             <a href="" className="md:max-w-sm sm:max-w-[18rem] max-w-[5rem] sm:py-8 py-6">
                <img className="sm:block hidden" src={logoImg} alt="" />
             <img className="sm:hidden h-12" src={icon} alt="" /></a>
                <Connect/>
            </header>
        </>
    )
}
