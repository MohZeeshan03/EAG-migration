import React from 'react';
import logoImg from '../assets/logo.png';

export default function Footer() {
    return (
        <footer className="border-t-2 border-zinc-500 md:text-lg">
            <div className="sl-container flex items-center md:flex-row flex-col justify-between md:py-20 py-9 md:gap-6 sm:gap-4 gap-2">
                <a href="#sec" className="sm:max-w-xs max-w-[16rem]"><img src={logoImg} alt="" /></a>
                <p className="max-w-lg opacity-50 md:text-left text-center">EAG is bringing commodity and hard asset trading to the present, and beyond.</p>
            </div>
            <div className="sl-container flex items-center justify-between sm:flex-row flex-col border-t border-zinc-500 md:py-9 sm:py-6 py-4 gap-2">
                <p className="opacity-75">Copyright © Emerging Assets Group 2023</p>
                <span className="flex items-center gap-5">
                    <a href="#sec" className="fill-white/75 hover:fill-amber-400 hover:-translate-y-1 sl-animated-lg"><svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                    </svg></a>
                    <a href="#sec" className="fill-white/75 hover:fill-amber-400 hover:-translate-y-1 sl-animated-lg"><svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg></a>
                </span>
            </div>
        </footer>
    )
}
