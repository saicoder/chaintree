import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { allIcons } from './item-icon/all-icons'
import { ItemIcon } from './item-icon'

interface IconSelectorModalProps {
  open: boolean
  activeIcon?: string
  onChangeIcon: (name: string) => void
  onClose: () => void
}

export default function IconSelectorModal(props: IconSelectorModalProps) {
  const [filter, setFilter] = useState('')

  const cancelButtonRef = useRef(null)
  let iconsList = allIcons

  if (filter.trim().length > 0) {
    iconsList = iconsList.filter((t) => t.toLowerCase().includes(filter.toLowerCase()))
  }

  const activeIconId = props.activeIcon?.replace('chaintree://icon/', '')

  useEffect(() => {
    setFilter('')
  }, [props.open])

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
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
                <div className="px-3 py-3 font-semibold leading-6 text-gray-900 bg-gray-100">
                  Select Icon
                </div>
                <div className="flex justify-center">
                  <input
                    type="text"
                    placeholder="Search"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 m-3 border rounded w-72"
                  />
                </div>

                <div
                  className="flex flex-wrap justify-center px-4 pt-5 pb-4 overflow-scroll bg-white sm:p-6 sm:pb-4"
                  style={{ maxHeight: '75vh' }}
                >
                  {iconsList.map((Icon, i) => (
                    <div
                      key={i}
                      onClick={() => props.onChangeIcon(`chaintree://icon/${Icon}`)}
                      className={`p-1 m-1 text-gray-600 border-2 rounded border-spacing-2 cursor-pointer hover:bg-gray-50 ${
                        activeIconId === Icon && 'border-blue-400'
                      }`}
                    >
                      <ItemIcon className="text-3xl" url={`chaintree://icon/${Icon}`} />
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
