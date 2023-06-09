import Moralis from 'moralis'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useWallet } from '@solana/wallet-adapter-react'

export function NFTCard({ mint, onSelect }: { mint: string; onSelect: (_: string) => void }) {
  const [image, setImage] = useState<string>()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (!publicKey) return

    Moralis.SolApi.nft
      .getNFTMetadata({ network: 'mainnet', address: publicKey.toBase58() })
      .then((t) => fetch(t.result.metaplex.metadataUri).then((t) => t.json()))
      .then((metadata) => {
        setImage(metadata.image)
      })
  }, [publicKey])

  const onClick = useCallback(() => {
    if (image) onSelect(image)
  }, [image])

  return (
    <div
      onClick={onClick}
      className="relative w-full overflow-hidden bg-gray-100 rounded cursor-pointer aspect-square hover:opacity-70"
    >
      {image && <Image src={image} alt="" fill />}
    </div>
  )
}
