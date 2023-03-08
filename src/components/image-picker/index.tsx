import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { Web3Storage } from 'web3.storage'
import Moralis from 'moralis'
import { NFTCard } from './nft'

const web3 = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_KEY! })

Moralis.start({ apiKey: 'vMp6PRz9w0810OHZrVwt4g4rtneNnZJKd5376dUidmCvLgZArnDqzJA8tZNvLcR2' })

interface ImagePickerProps {
  open: boolean
  imageSelected: (url: string) => void
  onClose: () => void
}

export function ImagePicker({ open, imageSelected, onClose }: ImagePickerProps) {
  const [nfts, setNfts] = useState<string[]>([])

  const onSelectLocalImage = async () => {
    const file = await new Promise<File>((resolve) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        if (input.files) resolve(input.files[0])
      }
      input.click()
    })

    const rootCid = await web3.put([file])
    const res = await web3.get(rootCid)
    const web3file = await res?.files().then((t) => t.at(0))

    const url = `ipfs://${rootCid}/${web3file?.name}`

    imageSelected(url)
    onClose()
  }

  useEffect(() => {
    Moralis.SolApi.account
      .getNFTs({
        network: 'mainnet',
        address: 'FQ6nvE4MCVFecmWJ5rSeQuz1X1YniMXDUaM6Q3Yda2tR',
      })
      .then((data) => {
        setNfts(data.result.slice(0, 12).map((t) => t.mint.address))
      })
  }, [])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-sm"
          leave="ease-in duration-200 backdrop-blur-none"
          leaveFrom="opacity-100 backdrop-blur-sm"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-3xl">
                <div className="p-4 text-base font-semibold text-gray-700 border-b bg-gray-50">
                  Select Image
                </div>
                <div className="flex justify-center p-4 py-10">
                  <button
                    onClick={onSelectLocalImage}
                    className="px-6 py-3 text-base font-semibold text-white rounded-lg bg-brand hover:opacity-75"
                  >
                    Upload
                  </button>
                </div>
                <div className="relative flex justify-center text-center">
                  <div className="z-10 px-3 text-xs font-bold text-gray-500 bg-white">
                    OR SELECT NFT
                  </div>
                  <div className="absolute w-full h-full border-t top-1"></div>
                </div>

                <div className="grid grid-cols-4 gap-3 p-5">
                  {nfts.map((t) => (
                    <NFTCard
                      key={t}
                      mint={t}
                      onSelect={(image) => {
                        imageSelected(image)
                        onClose()
                      }}
                    />
                  ))}
                  <div></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
