import React, { useEffect, useState } from 'react'
import { formatPrice, getWeb3 } from '../helper/functions';
import { useAccount, useNetwork } from 'wagmi';
import { useEthersSigner } from '../helper/useEthersProvider';
import { useGldnStats } from '../stats/useGldn';
import { DEFAULT_CHAIN, EAG_SYMBOL, GLDN_DECIMALS, GLDN_SYMBOL, NETWORKS } from '../helper/constant';
import { toast } from 'react-toastify';
import tokenABI from '../json/tokenAbi.json';
import migrationABI from '../json/migrationAbi.json';
import { ethers } from 'ethers';
import { getContract } from '../helper/contractHelper';
import { useEagStats } from '../stats/useEAG';
import heroImg from '../assets/hero.png'
import gldnImg from '../assets/gldn.png';
import eagImg from '../assets/eag.png';
import bgGif from '../assets/EAGif.gif';
import { useWeb3Modal } from '@web3modal/react';




export default function Home() {
    const { address, isConnected } = useAccount()
    const { chain } = useNetwork();
    const signer = useEthersSigner();
    const [updater, setUpdater] = useState(1);
    const stats = useGldnStats(updater);
    const wstats = useEagStats(updater);
    let web3 = getWeb3();
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(1);
    const { open } = useWeb3Modal()

    const handleApprove = async () => {
        setLoading(true)
        if (address && isConnected) {
            if (chain.id === DEFAULT_CHAIN) {
                try {
                    let tokenContract = getContract(tokenABI, NETWORKS[DEFAULT_CHAIN].GLDN_ADDRESS, signer);
                    let bal = parseFloat(stats.gldnBalance) + parseFloat(10000);
                    let approve_value = ethers.utils.parseUnits(stats.gldnBalance.toString(), GLDN_DECIMALS);
                    let tx = await tokenContract.approve(NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS, approve_value, { 'from': address })
                    toast.loading('Waiting for confirmation.');

                    var interval = setInterval(async function () {
                        var response = await web3.eth.getTransactionReceipt(tx.hash);
                        if (response != null) {
                            clearInterval(interval)
                            if (response.status === true) {
                                toast.dismiss()
                                toast.success('success ! your last transaction is success');
                                setLoading(false)
                                window.location.reload();
                            }
                            else if (response.status === false) {
                                toast.dismiss()
                                toast.error('error ! Your last transaction is failed.');
                                setLoading(false)
                            }
                            else {
                                toast.dismiss()
                                toast.error('error ! something went wrong.');
                                setLoading(false)
                            }
                        }
                    }, 5000);
                }
                catch (err) {
                    toast.dismiss()
                    console.log(err.message);
                    toast.error(err.reason ? err.reason : err.message);
                    setLoading(false)
                }

            }
            else {
                toast.dismiss()
                toast.error('Please switch to etherum mainnet ')
                setLoading(false)
            }
        }
        else {
            toast.dismiss()
            toast.error('Please connect wallet');
            setLoading(false)
        }
    }

    const handleMigration = async () => {
        setLoading(true)
        if (address && isConnected) {
            if (chain.id === DEFAULT_CHAIN) {
                try {
                    let migrationContract = getContract(migrationABI, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS, signer);
                    let tx = await migrationContract.migrate({ 'from': address })
                    toast.loading('Waiting for confirmation.');

                    var interval = setInterval(async function () {
                        var response = await web3.eth.getTransactionReceipt(tx.hash);
                        if (response != null) {
                            clearInterval(interval)
                            if (response.status === true) {
                                toast.dismiss()
                                toast.success('success ! your last transaction is success');
                                setLoading(false)
                                window.location.reload();
                            }
                            else if (response.status === false) {
                                toast.dismiss()
                                toast.error('error ! Your last transaction is failed.');
                                setLoading(false)
                            }
                            else {
                                toast.dismiss()
                                toast.error('error ! something went wrong.');
                                setLoading(false)
                            }
                        }
                    }, 5000);
                }
                catch (err) {
                    toast.dismiss()
                    console.log(err.message);
                    toast.error(err.reason ? err.reason : err.message);
                    setLoading(false)
                }

            }
            else {
                toast.dismiss()
                toast.error('Please switch to etherum mainnet ')
                setLoading(false)
            }
        }
        else {
            toast.dismiss()
            toast.error('Please connect wallet');
            setLoading(false)
        }
    }

    const handleClaim = async () => {
        setLoading(true)
        if (address && isConnected) {
            if (chain.id === DEFAULT_CHAIN) {
                try {
                    let migrationContract = getContract(migrationABI, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS, signer);
                    let tx = await migrationContract.claim({ 'from': address })
                    toast.loading('Waiting for confirmation.');

                    var interval = setInterval(async function () {
                        var response = await web3.eth.getTransactionReceipt(tx.hash);
                        if (response != null) {
                            clearInterval(interval)
                            if (response.status === true) {
                                toast.dismiss()
                                toast.success('success ! your last transaction is success');
                                setLoading(false)
                                window.location.reload();
                            }
                            else if (response.status === false) {
                                toast.dismiss()
                                toast.error('error ! Your last transaction is failed.');
                                setLoading(false)
                            }
                            else {
                                toast.dismiss()
                                toast.error('error ! something went wrong.');
                                setLoading(false)
                            }
                        }
                    }, 5000);
                }
                catch (err) {
                    toast.dismiss()
                    console.log(err.message);
                    toast.error(err.reason ? err.reason : err.message);
                    setLoading(false)
                }

            }
            else {
                toast.dismiss()
                toast.error('Please switch to etherum mainnet ')
                setLoading(false)
            }
        }
        else {
            toast.dismiss()
            toast.error('Please connect wallet');
            setLoading(false)
        }
    }

    useEffect(() => {
        console.log(wstats)
    }, [wstats])


    return (
        // <main class="site-main">
        //     <div class="container">
        //         <div class="card-main card-form">
        //             User Balance : {stats.gldnBalance} {GLDN_SYMBOL}
        //             <div className='mt-3'>
        //                 {
        //                     parseFloat(stats.allowance) >= parseFloat(stats.gldnBalance) ? (
        //                         <button type='button' onClick={() => handleMigration()}>Migration</button>
        //                     ) : (
        //                         <button type='button' onClick={() => handleApprove()}>Approve</button>
        //                     )
        //                 }
        //             </div>
        //             EAG Balance : {wstats.migratedTokens} {EAG_SYMBOL}
        //             <div className='mt-3'>
        //                 {
        //                     parseFloat(wstats.migratedTokens) > 0 && parseFloat(wstats.migratedTokens) > parseFloat(wstats.totalClaimed) &&
        //                     <button type='button' onClick={() => handleMigration()}>Claim</button>

        //                 }
        //             </div>
        //         </div>

        //     </div >
        // </main >

        <main className="relative md:pb-20">
            <section className="text-center md:pt-12 sm:pt-9 pt-6 pb-4">
                <img className="md:max-w-xs sm:max-w-[16rem] max-w-[12rem] mx-auto" src={heroImg} alt="" />
                <h1 className="md:text-6xl xs:text-4xl text-2xl text-amber-400 font-medium tracking-wide pt-5">Token Migration</h1>
            </section>
            <section className="sl-container md:py-20 sm:py-16 py-10">
                <div className="max-w-2xl bg-zinc-800/30 sm:px-6 px-4 py-3 rounded-2xl mx-auto">
                    <h2 className="">
                        <button onClick={() => { setActive(1) }} className={`w-1/2 text-center py-2 px-3 ${active == 1 ? "border-b-[3px] border-amber-400 text-amber-400" : "border-b-2 border-white/50 text-white/50"}`}>Migration</button>
                        <button onClick={() => { setActive(2) }} className={`w-1/2 text-center py-2 px-3 ${active == 2 ? "border-b-[3px] border-amber-400 text-amber-400" : "border-b-2 border-white/50 text-white/50"}`}>Claim</button>
                    </h2>
                    {active === 1 ? (
                        <div className="px-4">
                            <div className="mt-8">
                                <h3 className="font-semibold opacity-75">{GLDN_SYMBOL} Balance </h3>
                                <p className="flex items-center py-3 gap-2">
                                    <img src={gldnImg} alt="gldnImg" className="w-10" />
                                    <span className="text-amber-400 text-5xl font-bold">{stats.gldnBalance ? formatPrice(stats.gldnBalance, 5) : 0} {GLDN_SYMBOL}</span>
                                    {/* <span className="font-medium opacity-50 text-3xl">($0)</span> */}
                                </p>
                            </div>
                            {/* <div className="flex items-center justify-between mt-6">
                            <h3 className="opacity-75">Your staked PILOT</h3>
                            <p>
                                <span className="text-amber-400 font-bold mr-1">0</span>
                                <span className="font-medium opacity-50">($0)</span>
                            </p>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <h3 className="opacity-75">Total Rewards Claimed</h3>
                            <p className="flex items-center gap-1">
                                <img src={ethImg} alt="" className="w-5" />
                                <span className="text-amber-400 font-bold">0</span>
                                <span className="font-medium opacity-50">($0)</span>
                            </p>
                        </div> */}
                            {/* <div className="mt-6">
                            <h3 className="text-xl font-semibold text-amber-400"><span className="text-white opacity-75">Staking APR</span> 4.86%</h3>
                        </div> */}
                            {address && isConnected ? (
                                parseFloat(stats.allowance) >= parseFloat(stats.gldnBalance) ? (
                                    <div className="my-6">
                                        <button disabled={loading} className="w-full text-amber-400 bg-amber-400/25 py-2 px-3 rounded-md hover:bg-amber-400/40 sl-animated-lg" onClick={() => handleMigration()}>
                                            {loading ? 'Loading' : 'Migration'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="my-6">
                                        <button disabled={loading} className="w-full text-amber-400 bg-amber-400/25 py-2 px-3 rounded-md hover:bg-amber-400/40 sl-animated-lg" onClick={() => handleApprove()}>
                                            {loading ? 'Loading' : 'Approve'}
                                        </button>
                                    </div>
                                )
                            ) : (
                                <div className="my-6">
                                    <button className="w-full text-amber-400 bg-amber-400/25 py-2 px-3 rounded-md hover:bg-amber-400/40 sl-animated-lg" onClick={() => open()}>Connect Wallet</button>
                                </div>
                            )}

                        </div>
                    ) : (
                        <div className="px-4">
                            <div className="mt-8">
                                <h3 className="font-semibold opacity-75">{EAG_SYMBOL} Balance </h3>
                                <p className="flex items-center py-3 gap-2">
                                    <img src={eagImg} alt="eagImg" className="w-10" />
                                    <span className="text-amber-400 text-5xl font-bold">{wstats.eagBalance ? formatPrice(wstats.eagBalance, 5) : 0} {EAG_SYMBOL}</span>
                                    {/* <span className="font-medium opacity-50 text-3xl">($0)</span> */}
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <h3 className="opacity-75">Total Migrated : </h3>
                                <p>
                                    <span className="text-amber-400 font-bold mr-1">{wstats.migratedTokens ? formatPrice(wstats.migratedTokens, 5) : 0} {GLDN_SYMBOL}</span>
                                    {/* <span className="font-medium opacity-50">($0)</span> */}
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <h3 className="opacity-75">Total Claimed : </h3>
                                <p className="flex items-center gap-1">
                                    {/* <img src={ethImg} alt="" className="w-5" /> */}
                                    <span className="text-amber-400 font-bold">{wstats.totalClaimed ? formatPrice(wstats.totalClaimed, 5) : 0} {EAG_SYMBOL}</span>
                                    {/* <span className="font-medium opacity-50">($0)</span> */}
                                </p>
                            </div>
                            {/* <div className="mt-6">
                            <h3 className="text-xl font-semibold text-amber-400"><span className="text-white opacity-75">Staking APR</span> 4.86%</h3>
                        </div> */}
                            {address && isConnected ? (
                                <div className="my-6">
                                    {parseFloat(wstats.migratedTokens) > 0 && parseFloat(wstats.migratedTokens) > parseFloat(wstats.totalClaimed) &&
                                        <button disabled={loading} className="w-full text-amber-400 bg-amber-400/25 py-2 px-3 rounded-md hover:bg-amber-400/40 sl-animated-lg" onClick={() => handleClaim()}>
                                            {loading ? 'Loading' : 'Claim'}
                                        </button>
                                    }
                                </div>
                            ) : (
                                <div className="my-6">
                                    <button className="w-full text-amber-400 bg-amber-400/25 py-2 px-3 rounded-md hover:bg-amber-400/40 sl-animated-lg" onClick={() => open()}>Connect Wallet</button>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </section> 
        <img src={bgGif} alt="" className={`${active == 2 ? "absolute bottom-0 max-w-3xl left-1/2 -translate-x-1/2 opacity-25" : "hidden"}`} />
        </main>
    )
}
