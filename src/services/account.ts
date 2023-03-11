import { utils } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

import idl from '../../dapp/target/idl/chain_tree.json'

export interface Account {
  pda: string
  metadataUrl: string
  metadataHash: number[]
}

export const getPdaForUsername = (username: string) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode(username)],
    new PublicKey(idl.metadata.address)
  )

  return pda
}
