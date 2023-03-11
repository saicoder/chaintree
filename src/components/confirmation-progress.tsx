import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { create } from 'zustand'

interface LoaderStore {
  visible: boolean
  showLoader: () => void
  hideLoader: () => void
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  visible: false,
  showLoader: () => set(() => ({ visible: true })),
  hideLoader: () => set(() => ({ visible: false })),
}))

export function ConfirmationProgress() {
  const { visible } = useLoaderStore()

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => false}>
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
              <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow shadow-xl opacity-75 sm:my-8 sm:w-full sm:max-w-sm">
                <div className="flex flex-col items-center p-7">
                  <svg
                    className="w-20 h-20 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#ccc"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="#30c48d"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <div className="mt-5 font-semibold text-gray-700">Waiting for confirmation</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
