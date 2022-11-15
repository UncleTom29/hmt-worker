import { ethers } from 'ethers'
import { providers } from './config'

/**
 * Wrapper around hasEscrow
 * @param {*} provider
 * @param {*} escrow
 * @param {*} userAddress
 * @returns
 */
export const hasEscrow = async (network, escrowAddress, userAddress) => {
  const ABI = [{"inputs":[{"internalType":"address","name":"_eip20","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"eip20","type":"address"},{"indexed":false,"internalType":"address","name":"escrow","type":"address"}],"name":"Launched","type":"event"},{"inputs":[],"name":"counter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"trustedHandlers","type":"address[]"}],"name":"createEscrow","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"eip20","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"escrowCounters","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"hasEscrow","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_child","type":"address"}],"name":"isChild","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastEscrow","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
  const provider = new ethers.providers.JsonRpcProvider(
    providers[network],
    network,  
  )
  const contract = new ethers.Contract(escrowAddress, ABI, provider)

  return await contract.hasEscrow(userAddress)
}