import { getPdaForUsername } from '@/services/account'
import { AnchorProvider, Program, Wallet } from '@project-serum/anchor'
import { Connection, Keypair } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'

import idl from '../../../dapp/target/idl/chain_tree.json'
import { ChainTree } from 'dapp/target/types/chain_tree'
import { fetchProfile } from '@/services/profile'
import { Link } from '@/services/link'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ ok: boolean }>) {
  const username = req.query.username as string
  const linkId = req.query.linkId as string

  if (typeof username !== 'string' || typeof linkId !== 'string') {
    res.status(401).json({ ok: false })
    return
  }

  const wallet = new Wallet(Keypair.generate())
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_ENDPOINT!)

  const provider = new AnchorProvider(connection, wallet, {})
  const program = new Program<ChainTree>(idl as any, idl.metadata.address, provider)
  const account = await program.account.profile
    .fetch(getPdaForUsername(username))
    .catch(() => undefined)

  if (!account) return { profile: undefined }
  const profile = await fetchProfile(account)

  const link = profile?.items.find((t) => t.id === linkId && t.type === 'link') as Link | undefined

  if (!link) {
    res.status(401).json({ ok: false })
    return
  }

  await prisma.click.create({
    data: {
      date: new Date().toISOString().slice(0, 10),
      profileUsername: username,
      linkId,
    },
  })

  res.status(200).json({
    ok: true,
  })
}
