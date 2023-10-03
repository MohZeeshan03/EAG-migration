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
        claimAvailable: false
    });

    let migrationContract = new web3.eth.Contract(migrationAbi, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS);
    let gldnContract = new web3.eth.Contract(tokenAbi, NETWORKS[DEFAULT_CHAIN].GLDN_ADDRESS);

    useEffect(() => {
        const fetch = async () => {
            try {



                const data = await getMultiCall(
                    address ? [
                        migrationContract.methods.claimAvailable(),
                        gldnContract.methods.balanceOf(address),
                        gldnContract.methods.allowance(address, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS),
                    ] : [
                        migrationContract.methods.claimAvailable()
                    ]);

                setStats({
                    gldnBalance: data[1] ?  data[0] / Math.pow(10, GLDN_DECIMALS) : 0,
                    allowance: data[2] ?  data[1] / Math.pow(10, GLDN_DECIMALS) : 0,
                    claimAvailable: data[0]
                })
            }
            catch (err) {
                setStats({
                    gldnBalance: 0,
                    allowance: 0,
                    claimAvailable: false
                })
                console.log(err.message);

            }
        }

       
        fetch()
      
        
        // eslint-disable-next-line
    }, [updater, address]);

    return stats;
}
