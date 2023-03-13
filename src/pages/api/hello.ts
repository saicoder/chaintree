// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  label: string
  icon: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    res.status(200).json({
      label: 'John Doe',
      icon: 'https://chaintree.vercel.app/_next/image?url=https%3A%2F%2Fwww.arweave.net%2FcbKLtWO1-MdkBhnqF5PvEm2Su3-YcfwWewUt5Z4mP_4%3Fext%3Dpng&w=3840&q=75',
    })

    return
  }

  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_ENDPOINT!)
  const { blockhash } = await connection.getLatestBlockhash('finalized')

  const tx = new Transaction({
    feePayer: new PublicKey('CXxXQmjeyjPDVRdL2mENi2cDzHwSeFLbWazA2T9bCAV'),
    recentBlockhash: blockhash,
  })

  const serializedTransaction = tx.serialize({ requireAllSignatures: false })
  const base64 = serializedTransaction.toString('base64')

  res.status(200).json({
    transaction: base64,
    message: 'Thanks for your order!',
  })
}
