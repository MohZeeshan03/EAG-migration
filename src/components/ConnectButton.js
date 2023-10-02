import React from "react";
import { useAccount } from 'wagmi';
import { useWeb3Modal , Web3Button } from '@web3modal/react';




export const Connect = function () {
    const { address, isConnected } = useAccount()
    const { open } = useWeb3Modal()
    

   return (
        <React.Fragment>

            <>
                {address && isConnected ? (
                   
                        <Web3Button/>
                    
                ) : (
                    <button type="button" className="text-amber-400 bg-amber-400/25 py-1 xs:px-3 px-2 rounded-3xl hover:-translate-y-2 sl-animated-lg" onClick={() => open()}>
                            Connect Wallet
                    </button>
                )
                }

            </>

        </React.Fragment >
    );
};

export default Connect;