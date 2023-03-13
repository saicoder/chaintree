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
}
