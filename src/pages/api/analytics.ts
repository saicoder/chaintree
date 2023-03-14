import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { add } from 'date-fns'
import { Link } from '@/services/link'
import { AnchorProvider, Program, Wallet } from '@project-serum/anchor'
import { Connection, Keypair } from '@solana/web3.js'
import { ChainTree } from 'dapp/target/types/chain_tree'
import { getPdaForUsername } from '@/services/account'
import { fetchProfile } from '@/services/profile'

const prisma = new PrismaClient()
import idl from '../../../dapp/target/idl/chain_tree.json'

export type AnalyticsResult = {
  clicks7Day: Array<{ _count: number; date: string }>
  clicks7DayByLink: Array<{ _count: number; link: Link }>
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AnalyticsResult>) {
  const username = req.query.username as string
  const wallet = new Wallet(Keypair.generate())
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_ENDPOINT!)

  const provider = new AnchorProvider(connection, wallet, {})
  const program = new Program<ChainTree>(idl as any, idl.metadata.address, provider)
  const account = await program.account.profile
    .fetch(getPdaForUsername(username))
    .catch(() => undefined)

  if (!account) return { profile: undefined }
  const profile = await fetchProfile(account)

  if (!profile) {
    throw new Error('Invalid profile')
  }

  const start = add(new Date(), { days: -6 })

  const clicks7DayRaw = await prisma.click.groupBy({
    by: ['date'],
    _count: true,
    where: {
      profileUsername: username,
      date: { gte: start.toISOString().slice(0, 10) },
    },
  })

  const clicks7Day = Array.from(Array(7)).map((_, i) => {
    const date = add(start, { days: i }).toISOString().slice(0, 10)

    return {
      date,
      _count: clicks7DayRaw.find((t) => t.date === date)?._count || 0,
    }
  })

  const clicks7DayByLinkRaw = await prisma.click.groupBy({
    by: ['linkId'],
    _count: true,
    where: {
      profileUsername: username,
      date: { gte: start.toISOString().slice(0, 10) },
    },
    orderBy: {
      _count: {
        date: 'desc',
      },
    },
  })

  const clicks7DayByLink = clicks7DayByLinkRaw
    .filter((t) => profile.items.some((z) => z.id === t.linkId))
    .map((t) => {
      return {
        _count: t._count,
        link: profile.items.find((z) => z.id === t.linkId) as Link,
      }
    })

  res.status(200).json({
    clicks7Day,
    clicks7DayByLink,
  })
}
