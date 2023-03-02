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

export type ProfileItem = Link | Header | WalletAddress

export const EXAMPLE_ITEMS: ProfileItem[] = [
  {
    type: 'link',
    label: 'Twitter',
    url: 'https://twitter.com/saicoder',
    icon: 'chaintree://icon/TbBrandTwitter',
  },
  {
    type: 'link',
    label: 'Instagram',
    url: 'https://instagram.com/saicoder',
  },
  {
    type: 'header',
    label: 'Wallets',
  },
  {
    type: 'wallet',
    label: 'Solana',
    address: '4LADVWGMV3CQm6nQ5qMuWfeJFV5KHH6kg2KLPyh3qivG',
    blockchain: 'Solana',
  },
  {
    type: 'header',
    label: 'Developer Accounts',
  },
  {
    type: 'link',
    label: 'GitHub',
    url: 'https://github.com/saicoder',
  },
]
