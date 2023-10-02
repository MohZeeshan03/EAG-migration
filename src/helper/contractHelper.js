import { ethers } from "ethers";
import { getWeb3 } from "./functions";
import tokenABI from '../json/tokenAbi.json';
import migrationABI from '../json/migrationAbi.json';
import multicallABI from '../json/multicall.json';
import { DEFAULT_CHAIN, NETWORKS } from "./constant";


export const getContract = (abi, address, library) => {
  try {
    return new ethers.Contract(address, abi, library)
  }
  catch (err) {
    return false;
  }
}

export const getTokenContract = (address) => {
  let web3 = getWeb3();
  return new web3.eth.Contract(tokenABI, address);
}

export const getMigrationContract = () => {
  let web3 = getWeb3();
  return new web3.eth.Contract(migrationABI, NETWORKS[DEFAULT_CHAIN].MIGRATION_ADDRESS);
}

export const getMultiCallContractConnect = () => {
  let address =  NETWORKS[DEFAULT_CHAIN].MULTICALL_ADDRESS;
  let web3 = getWeb3();
  return new web3.eth.Contract(multicallABI, address);
}


export const getMultiCall = async (calls = []) => {
  let web3 = getWeb3();
  let multiCalladdress = NETWORKS[DEFAULT_CHAIN].MULTICALL_ADDRESS;
  const mc = new web3.eth.Contract(multicallABI, multiCalladdress);
  const callRequests = calls.map((call) => {
    const callData = call.encodeABI();
    return {
      target: call._parent._address,
      callData,
    };
  });

  const { returnData } = await mc.methods
    .aggregate(callRequests)
    .call({});

  let finalData = returnData.map((hex, index) => {
    const types = calls[index]._method.outputs.map((o) =>
      o.internalType !== o.type && o.internalType !== undefined ? o : o.type
    );

    let result = web3.eth.abi.decodeParameters(types, hex);

    delete result.__length__;

    result = Object.values(result);

    return result.length === 1 ? result[0] : result;
  });

  return finalData;
}