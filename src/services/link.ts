import { encodeURL } from '@solana/pay'
import { PublicKey } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { nanoid } from 'nanoid'

export const LinkTypes = ['link', 'header', 'wallet'] as const
export type LinkType = typeof LinkTypes[number]

export const Blockchains = ['Solana'] as const
export type Blockchain = typeof Blockchains[number]

export interface Link {
  icon?: string
  type: 'link'
  label: string
  url: string
}

export interface Header {
  type: 'header'
  label: string
}

export interface WalletAddress {
  type: 'wallet'
  label: string
  blockchain: Blockchain
  address: string
  icon?: string

  paymentMemo?: string
  paymentMessage?: string
  paymentAmount?: string
}

export interface Identifiable {
  id: string
}

export const paymentUrlFor = (wallet: WalletAddress) => {
  return encodeURL({
    label: wallet.label,
    recipient: new PublicKey(wallet.address),
    amount: wallet.paymentAmount ? new BigNumber(wallet.paymentAmount) : undefined,
    message: wallet.paymentMessage || undefined,
    memo: wallet.paymentMemo || undefined,
  }).toString()
}

export type ProfileItem = (Link | Header | WalletAddress) & Identifiable
