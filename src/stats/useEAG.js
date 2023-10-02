import { useEffect, useState } from "react"
import migrationAbi from '../json/migrationAbi.json'
import tokenAbi from '../json/tokenAbi.json'
import { useAccount } from "wagmi";
import { DEFAULT_CHAIN, EAG_DECIMALS, NETWORKS } from "../helper/constant";
import { getMultiCall } from "../helper/contractHelper";
import { getWeb3 } from "../helper/functions";


export const useEagStats = (updater, lockId) => {
    let web3 = getWeb3();
    let { address } = useAccount()


    const [stats, setStats] = useState({
        migrationTx: 0,
        migratedTokens: 0,
        totalClaimed: 0,
        index: 0,
        eagBalance : 0
    });


    let migrationContract = new web3.eth.Contract(migrationAbi, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS);
    let eagContract = new web3.eth.Contract(tokenAbi, NETWORKS[DEFAULT_CHAIN].EAG_ADDRESS);

    useEffect(() => {
        const fetch = async () => {
            try {



                const data = await getMultiCall([
                    migrationContract.methods._userIndex(address),
                    eagContract.methods.balanceOf(address)
                ]);
                

                const recordData = await await getMultiCall([
                    migrationContract.methods._record(data[0])
                ]);

                setStats({
                    migrationTx: recordData[0][1],
                    migratedTokens: recordData[0][2] / Math.pow(10,EAG_DECIMALS),
                    totalClaimed: recordData[0][3] / Math.pow(10,EAG_DECIMALS),
                    index: data[0],
                    eagBalance : data[1] / Math.pow(10,EAG_DECIMALS)

                })
            }
            catch (err) {
                setStats({
                    migrationTx: 0,
                    migratedTokens: 0,
                    totalClaimed: 0,
                    index: 0,
                    eagBalance : 0
                })
                console.log(err.message);

            }
        }

        if (address) {
            fetch()
        }
        else {
            setStats({
                migrationTx: 0,
                migratedTokens: 0,
                totalClaimed: 0,
                index: 0,
                eagBalance : 0
            })
        }

        // eslint-disable-next-line
    }, [updater, address]);

    return stats;
}
