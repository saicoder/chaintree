import { ProfileRender } from '@/components/profile-render'

import { AnchorProvider, Program, Wallet } from '@project-serum/anchor'
import { ChainTree } from 'dapp/target/types/chain_tree'
import Link from 'next/link'

import idl from '../../dapp/target/idl/chain_tree.json'
import { Connection, Keypair } from '@solana/web3.js'
import { getPdaForUsername } from '@/services/account'
import { NextPageContext } from 'next'
import { Profile, fetchProfile } from '@/services/profile'
import { Logo } from '@/components/icon'

export default function ProfilePage({ profile }: { profile?: Profile }) {
  if (!profile)
    return (
      <main className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Profile not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the profile you&apos;re looking for.
            <br />
            This profile can be yours.
          </p>
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <Link
              href="/"
              className="px-4 py-3 text-base font-semibold text-white rounded-md shadow-sm bg-brand hover:opacity-75"
            >
              Create Profile
            </Link>
          </div>
        </div>
      </main>
    )

  return <ProfileRender profile={profile} />
}

ProfilePage.getInitialProps = async ({ query }: NextPageContext) => {
  const wallet = new Wallet(Keypair.generate())
  const connection = new Connection('http://127.0.0.1:8899')

  const provider = new AnchorProvider(connection, wallet, {})
  const program = new Program<ChainTree>(idl as any, idl.metadata.address, provider)
  const account = await program.account.profile
    .fetch(getPdaForUsername(query.slug as string))
    .catch(() => undefined)

  if (!account) return { profile: undefined }
  const profile = await fetchProfile(account)

  return { profile }
}
