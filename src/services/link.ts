import { nanoid } from 'nanoid'

export const LinkTypes = ['link', 'header', 'wallet'] as const
export type LinkType = typeof LinkTypes[number]

export const Blockchains = ['Solana', 'Ethereum'] as const
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
}

export interface Identifiable {
  id: string
}

export type ProfileItem = (Link | Header | WalletAddress) & Identifiable
