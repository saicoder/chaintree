import { MdDragIndicator } from 'react-icons/md'
import { ItemIcon } from './item-icon'
import { TbTrash } from 'react-icons/tb'
import { Blockchains, ProfileItem } from '../services/link'
import { useEffect, useRef, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Handle } from './sortable-list'

export interface ItemProps {
  item: ProfileItem
  onUpdate: (item: ProfileItem) => void
  onSetIcon: (item: ProfileItem) => void
  onRemove: () => void
  handle: Handle
}

export function Item({ item, onUpdate, onSetIcon, onRemove, handle }: ItemProps) {
  const [editMode, setEditMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const clickEvent = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as any)) setEditMode(false)
    }

    document.body.addEventListener('click', clickEvent)
    return () => {
      document.body.removeEventListener('click', clickEvent)
    }
  }, [])

  return (
    <div
      ref={(el) => (containerRef.current = el || undefined)}
      className="mb-2 overflow-hidden bg-white shadow-sm rounded-2xl"
    >
      <div className="flex items-center border-t border-gray-100">
        <div className="px-2" {...handle}>
          <MdDragIndicator size={20} className="text-gray-400" />
        </div>

        <div className="px-1 cursor-pointer w-9" onClick={() => onSetIcon(item)}>
          {item.type !== 'header' && (
            <ItemIcon
              url={item.icon || 'chaintree://icon/ti-frame'}
              style={{ opacity: !!item.icon ? 1 : 0.3 }}
              className="text-slate-600"
            />
          )}
        </div>

        <div className="flex-1 px-2 py-5">
          <input
            className="flex-1 text-base font-medium outline-none"
            value={item.label}
            onFocus={() => setEditMode(true)}
            onChange={(e) => onUpdate({ ...item, label: e.target.value })}
            placeholder={item.type === 'header' ? 'Header text' : 'Label'}
          />

          {item.type === 'link' && (
            <input
              onFocus={() => setEditMode(true)}
              className="block w-full mt-1 text-sm outline-none text-slate-500"
              value={item.url}
              onChange={(e) => onUpdate({ ...item, url: e.target.value })}
              placeholder="Your URL"
            />
          )}

          {item.type === 'wallet' && (
            <input
              onFocus={() => setEditMode(true)}
              className="block w-full mt-1 text-sm outline-none text-slate-500"
              value={item.address}
              onChange={(e) => onUpdate({ ...item, address: e.target.value })}
              placeholder="Address"
            />
          )}
        </div>

        <div className="flex flex-col items-end">
          <button
            onClick={() => onRemove()}
            className="p-2 mr-2 rounded opacity-60 hover:opacity-100 hover:bg-red-50 hover:text-red-700"
          >
            <TbTrash />
          </button>
        </div>
      </div>

      {item.type === 'wallet' && (
        <div className={`overflow-hidden  ${editMode ? 'max-h-28' : 'max-h-0'} transition-all`}>
          <div className="p-5 border-t">
            <div>
              <label htmlFor="blockchain" className="block text-sm font-medium text-gray-700">
                Blockchain
              </label>
              <select
                id="blockchain"
                className="w-32 px-1 py-2 mt-2 text-sm border border-gray-300 rounded-md shadow-sm outline-none"
              >
                {Blockchains.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
