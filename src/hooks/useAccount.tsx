import { useCallback, useContext, useEffect, useState } from 'react'

import { AnchorProvider, Program } from '@project-serum/anchor'
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { Connection } from '@solana/web3.js'
import { ChainTree } from 'dapp/target/types/chain_tree'
import { Account, getPdaForUsername } from '@/services/account'

import { Profile, fetchProfile } from '@/services/profile'
import { Web3Storage } from 'web3.storage'
import idl from '../../dapp/target/idl/chain_tree.json'
import React from 'react'
import { useLoaderStore } from '@/components/confirmation-progress'

const web3 = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_KEY! })

interface AccountContext {
  connected: boolean
  publicKey?: string
  connectWallet: () => void
  account?: Account
  accountLoading: boolean
  chainProfile?: Profile
  fetchAccountByUsername: (_: string) => Promise<Account | undefined>
  saveProfile: (_: Profile) => Promise<void>
}

export const AccountContext = React.createContext<AccountContext>(undefined as any)
export const useAccount = () => useContext(AccountContext)

export const AccountContextProvider = ({ children }: { children: React.ReactNode }) => {
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const anchorWallet = useAnchorWallet()
  const [program, setProgram] = useState<Program<ChainTree>>()

  const [accountLoading, setAccountLoading] = useState(false)
  const [account, setAccount] = useState<Account>()
  const [chainProfile, setChainProfile] = useState<Profile>()

  const { showLoader, hideLoader } = useLoaderStore()

  // ================= Load Program Effect ===============
  useEffect(() => {
    if (!anchorWallet) {
      setProgram(undefined)
      return
    }

    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_ENDPOINT!)
    const provider = new AnchorProvider(connection, anchorWallet, {})
    const program = new Program<ChainTree>(idl as any, idl.metadata.address, provider)

    setProgram(program)
  }, [anchorWallet])

  // ================= Load Account Effect ===============
  useEffect(() => {
    if (!program || !wallet.publicKey) return

    setAccountLoading(true)
    program.account.profile
      .all([{ memcmp: { offset: 8, bytes: wallet.publicKey.toBase58() } }])
      .then(([profile]) => {
        if (!profile) setAccount(undefined)
        else
          setAccount({
            pda: profile.publicKey.toBase58(),
            metadataHash: profile.account.metadataHash,
            metadataUrl: profile.account.metadataUrl,
          })
      })
      .finally(() => {
        setAccountLoading(false)
      })
  }, [program, wallet.publicKey])

  // =============== Load Chain Profile ====================
  useEffect(() => {
    if (!account?.metadataUrl) {
      setChainProfile(undefined)
      return
    }

    fetchProfile(account).then(setChainProfile)
  }, [account])

  // ================= METHOD: Fetch Profile ===============
  const fetchAccountByUsername = useCallback(
    async (username: string) => {
      const pda = getPdaForUsername(username)
      const result = await program?.account.profile.fetch(pda).catch(() => undefined)

      if (!result) return undefined
      return {
        pda: pda.toBase58(),
        metadataUrl: result.metadataUrl,
        metadataHash: result.metadataHash,
      } as Account
    },
    [program]
  )

  // ================= METHOD: Save Profile ===============
  const saveProfile = useCallback(
    async (profile: Profile) => {
      try {
        showLoader()

        const profileContent = JSON.stringify(profile)
        const file = new File([profileContent], 'profile.json', { type: 'application/json' })
        const cid = await web3.put([file])

        const pda = getPdaForUsername(profile.slug)
        const metadataUrl = `ipfs://${cid}/profile.json`

        const profileHash = await crypto.subtle.digest(
          'SHA-256',
          new TextEncoder().encode(profileContent)
        )
        const metadataHash = Array.from(new Uint8Array(profileHash))

        if (!account) {
          // create new account
          await program?.methods
            .initialize(profile.slug, metadataUrl, metadataHash)
            .accounts({
              profile: pda,
            })
            .rpc()
        } else {
          await program?.methods
            .updateProfile(metadataUrl, metadataHash)
            .accounts({
              profile: pda,
            })
            .rpc()
        }

        setAccount({ pda: pda.toBase58(), metadataHash, metadataUrl })
        setChainProfile(profile)
      } catch (ex: any) {
        alert(ex.message)
      } finally {
        hideLoader()
      }
    },
    [account, program]
  )

  return (
    <AccountContext.Provider
      value={{
        connected: wallet.connected,
        publicKey: wallet.publicKey?.toBase58(),
        connectWallet: () => walletModal.setVisible(true),

        account,
        accountLoading,
        chainProfile,

        fetchAccountByUsername,
        saveProfile,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}
