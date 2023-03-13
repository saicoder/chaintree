import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { createQR } from '@solana/pay'
import { WalletAddress, paymentUrlFor } from '@/services/link'

import Image from 'next/image'
import solanaPay from './solana-pay.svg'

interface PaymentModalProps {
  wallet?: WalletAddress
  onClose: () => void
}

export function PaymentModal({ wallet, onClose }: PaymentModalProps) {
  const [url, setURL] = useState<string>()
  const [qr, setQR] = useState<string>()

  // Generate URL
  useEffect(() => {
    if (wallet) setURL(paymentUrlFor(wallet))
  }, [wallet])

  // Generate QR Code
  useEffect(() => {
    if (!url) return
    const qr = createQR(url, 512)

    qr.getRawData('jpeg').then((t) => {
      if (!t) return
      setQR(URL.createObjectURL(t))
    })
  }, [url])

  return (
    <Transition.Root show={!!wallet} as={Fragment}>
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
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-md" />
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
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm">
                <div className="py-3 font-semibold text-center text-gray-700 border-b bg-gray-50">
                  Payment: {wallet?.type}
                </div>

                <div className="p-5">
                  <div className="relative mx-5 aspect-square bg-slate-300">
                    {qr && <Image alt="" src={qr} fill />}
                  </div>

                  <div className="mt-2 font-semibold text-center text-gray-500 text-tiny">
                    (Please scan the code to make the payment)
                  </div>
                </div>

                <div className="p-5 border-t bg-gray-50">
                  <a
                    className="flex justify-center h-12 bg-black rounded-md hover:opacity-75"
                    href={url}
                  >
                    <Image src={solanaPay} alt="" />
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
