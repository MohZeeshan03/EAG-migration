import { useEffect, useState } from "react"
import tokenAbi from '../json/tokenAbi.json';
import { useAccount } from "wagmi";
import { DEFAULT_CHAIN, GLDN_DECIMALS, NETWORKS } from "../helper/constant";
import { getMultiCall } from "../helper/contractHelper";
import { getWeb3 } from "../helper/functions";


export const useGldnStats = (updater, lockId) => {
    let web3 = getWeb3();
    let { address } = useAccount()


    const [stats, setStats] = useState({
        gldnBalance: 0,
        allowance: 0
    });


    let gldnContract = new web3.eth.Contract(tokenAbi, NETWORKS[DEFAULT_CHAIN].GLDN_ADDRESS);

    useEffect(() => {
        const fetch = async () => {
            try {



                const data = await getMultiCall([
                    gldnContract.methods.balanceOf(address),
                    gldnContract.methods.allowance(address, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS)
                ]);


    

                setStats({
                    gldnBalance: data[0] / Math.pow(10, GLDN_DECIMALS),
                    allowance: data[1] / Math.pow(10, GLDN_DECIMALS)
                })
            }
            catch (err) {
                setStats({
                    gldnBalance: 0,
                    allowance: 0
                })
                console.log(err.message);

            }
        }

        if(address){
            fetch()
        }
        else{
            setStats({
                gldnBalance: 0,
                allowence: 0
            })
        }

        // eslint-disable-next-line
    }, [updater, address]);

    return stats;
}
