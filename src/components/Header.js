import React from 'react';
import logoImg from '../assets/logo.png';
import Connect from './ConnectButton';

export default function Header() {
    return (
        <>
             <header className="sl-container flex justify-between items-center">
                <a href="#sec" className="md:max-w-sm sm:max-w-[18rem] sm:py-8 py-6"><img src={logoImg} alt="" /></a>
                <Connect/>
            </header>
        </>
    )
}
