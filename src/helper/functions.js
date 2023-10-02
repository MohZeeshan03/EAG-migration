import Web3 from "web3";
import { DEFAULT_CHAIN, NETWORKS } from "./constant";

export const trimAddress = (addr) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
}


export const formatPrice = (num) => {
    if(num <= 1){
        return parseFloat(parseFloat(num).toFixed(6));
    }
    return new Intl.NumberFormat('en-US',{maximumSignificantDigits : 5}).format(num);
}

export const getWeb3 = () => {
    return new Web3(NETWORKS[DEFAULT_CHAIN].rpc);
}

export const formatDateWithZone = (unixTime) =>{
    try{
      let dateString = new Date(unixTime).toString();
      let startIndex = dateString.indexOf("GMT");
      let modifyDate = dateString.substring(0,startIndex);
      return modifyDate;
    }
    catch(err){
      console.log(err.message);
    }
    
  }