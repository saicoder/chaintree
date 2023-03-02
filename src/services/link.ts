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

export const EXAMPLE_ITEMS: ProfileItem[] = [
  {
    id: nanoid(),
    type: 'link',
    label: 'Twitter',
    url: 'https://twitter.com/saicoder',
    icon: 'chaintree://icon/TbBrandTwitter',
  },
  {
    id: nanoid(),
    type: 'link',
    label: 'Instagram',
    url: 'https://instagram.com/saicoder',
  },
  {
    id: nanoid(),
    type: 'header',
    label: 'Wallets',
  },
  {
    id: nanoid(),
    type: 'wallet',
    label: 'Solana',
    address: '4LADVWGMV3CQm6nQ5qMuWfeJFV5KHH6kg2KLPyh3qivG',
    blockchain: 'Solana',
  },
  {
    id: nanoid(),
    type: 'header',
    label: 'Developer Accounts',
  },
  {
    id: nanoid(),
    type: 'link',
    label: 'GitHub',
    url: 'https://github.com/saicoder',
  },
]
