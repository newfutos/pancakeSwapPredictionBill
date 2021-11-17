import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  createTransactionEvent,
  getJsonRpcUrl

} from 'forta-agent'
import Web3 from 'web3';
import {
  PANCAKESWAP_PREDICT_ABI,
  PANCAKESWAP_PREDICT_ADDRESS

} from "./consts"
import iTxInput from './iTXInput';

const abiDecoder = require('abi-decoder');
abiDecoder.addABI(PANCAKESWAP_PREDICT_ABI)
const web3 = new Web3(getJsonRpcUrl())
const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  if (txEvent.transaction.to === PANCAKESWAP_PREDICT_ADDRESS){
    const decodedSig:iTxInput = abiDecoder.decodeMethod(txEvent.transaction.data)
    console.log(decodedSig)
    if (decodedSig.name === "betBear" || decodedSig.name==="betBull") {
      findings.push(
        Finding.fromObject({
          name: "BET",
          description: `Detect bet transaction `,
          alertId: "FORTA-130",
          severity: FindingSeverity.Info,
          type: FindingType.Info,
          metadata:{
            eventName:decodedSig.name,
            value:decodedSig.params[0].value
          }
  
        })
       )

    }
  }    
    

  return findings;
}

export default {
  handleTransaction
}