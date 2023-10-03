import { useEffect, useState } from "react"
import tokenAbi from '../json/tokenAbi.json';
import migrationAbi from '../json/migrationAbi.json'
import { useAccount } from "wagmi";
import { DEFAULT_CHAIN, GLDN_DECIMALS, NETWORKS } from "../helper/constant";
import { getMultiCall } from "../helper/contractHelper";
import { getWeb3 } from "../helper/functions";


export const useGldnStats = (updater, lockId) => {
    let web3 = getWeb3();
    let { address } = useAccount()


    const [stats, setStats] = useState({
        gldnBalance: 0,
        allowance: 0,
        claimAvailable: false,
        totalTokensMigrated : 0
    });

    let migrationContract = new web3.eth.Contract(migrationAbi, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS);
    let gldnContract = new web3.eth.Contract(tokenAbi, NETWORKS[DEFAULT_CHAIN].GLDN_ADDRESS);

    useEffect(() => {
        const fetch = async () => {
            try {

                const data = await getMultiCall(
                    address ? [
                        migrationContract.methods.claimAvailable(),
                        migrationContract.methods.totalTokensMigrated(),
                        gldnContract.methods.balanceOf(address),
                        gldnContract.methods.allowance(address, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS),
                    ] : [
                        migrationContract.methods.claimAvailable(),
                        migrationContract.methods.totalTokensMigrated()
                    ]);
                
                setStats({
                    gldnBalance: data[2] && address ?  data[2] / Math.pow(10, GLDN_DECIMALS) : 0,
                    allowance: data[3] && address ?  data[3] / Math.pow(10, GLDN_DECIMALS) : 0,
                    claimAvailable: data[0],
                    totalTokensMigrated : data[1] / Math.pow(10,GLDN_DECIMALS)
                    
                })
            }
            catch (err) {
                setStats({
                    gldnBalance: 0,
                    allowance: 0,
                    claimAvailable: false,
                    totalTokensMigrated : 0
                })
                console.log(err.message);

            }
        }

       
        fetch()
      
        
        // eslint-disable-next-line
    }, [updater, address]);

    return stats;
}
