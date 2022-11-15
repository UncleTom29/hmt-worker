import { hmtEscrowConfig } from './config'
import { hasEscrow } from './escrow'

/**
 * Return true if the hasEscrow function is true!
 * @param {*} hmtEscrowConfig
 */
const checkEscrow = async address => {
  const promises = Object.keys(hmtEscrowConfig.escrows).map(escrowAddress =>
    hasEscrow(
      hmtEscrowConfig.escrows[escrowAddress].network,
      escrowAddress,
      address,
    ),
  )
  const results = await Promise.all(promises)
  return !![results].find(x => x)
};

export default checkEscrow