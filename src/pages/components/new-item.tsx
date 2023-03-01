import { useState } from 'react'
import { TbHeading, TbLink, TbPlus, TbWallet, TbX } from 'react-icons/tb'
import { LinkType } from '../services/link'

interface NewItemProps {
  onAddNew: (type: LinkType) => void
}

export function NewItem(props: NewItemProps) {
  const [expanded, setExpanded] = useState(false)

  const onAddNew = (type: LinkType) => {
    setExpanded(false)
    props.onAddNew(type)
  }

  if (!expanded)
    return (
      <div
        key="newCont"
        onClick={() => setExpanded(true)}
        className="flex items-center justify-center w-full h-12 font-medium text-white transition-all bg-indigo-700 rounded-full cursor-pointer"
      >
        <TbPlus fontSize={18} />
        <div className="ml-1">Add</div>
      </div>
    )

  return (
    <div
      key="newCont"
      className="flex flex-col w-full h-56 transition-all bg-white shadow rounded-2xl"
    >
      <div className="flex items-center border-b">
        <div className="p-5 font-medium text-gray-800 ">Add New</div>
        <div className="flex-1"></div>
        <div
          onClick={() => setExpanded(false)}
          className="p-4 text-gray-500 cursor-pointer hover:text-gray-800"
        >
          <TbX size={24} />
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 mx-5 space-x-2">
        <div
          onClick={() => onAddNew('header')}
          className="flex flex-col items-center w-40 p-4 transition-all bg-white border-2 rounded-md cursor-pointer hover:bg-gray-100"
        >
          <TbHeading size={40} />
          <div className="mt-2 font-semibold text-gray-800">Header</div>
        </div>

        <div
          onClick={() => onAddNew('link')}
          className="flex flex-col items-center w-40 p-4 transition-all bg-white border-2 rounded-md cursor-pointer hover:bg-gray-100"
        >
          <TbLink size={40} />
          <div className="mt-2 font-semibold text-gray-800">Link</div>
        </div>

        <div
          onClick={() => onAddNew('wallet')}
          className="flex flex-col items-center w-40 p-4 transition-all bg-white border-2 rounded-md cursor-pointer hover:bg-gray-100"
        >
          <TbWallet size={40} />
          <div className="mt-2 font-semibold text-gray-800">Crypto Wallet</div>
        </div>
      </div>
    </div>
  )
}
