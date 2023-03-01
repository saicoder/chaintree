import { TbPlus } from 'react-icons/tb'
import { Layout } from './components/layout'
import { LinkType, ProfileItem, exampleItems } from './services/link'

import { Item } from './components/item'
import { useState } from 'react'
import IconSelectorModal from './components/icon-selector-modal'
import { NewItem } from './components/new-item'

export default function Home() {
  const [items, setItems] = useState(exampleItems)
  const [iconSelector, setIconSelector] = useState<ProfileItem>()

  const onSetIcon = (icon: string) => {
    setItems(items.map((t) => (t == iconSelector ? { ...iconSelector, icon } : t)))

    setIconSelector(undefined)
  }

  const onAddNew = (type: LinkType) => {
    if (type === 'header') setItems([...items, { type: 'header', label: '' }])
    if (type === 'link') setItems([...items, { type: 'link', label: '', url: '' }])
    if (type === 'wallet')
      setItems([...items, { type: 'wallet', label: '', address: '', blockchain: 'Solana' }])
  }

  return (
    <Layout>
      <div className="py-5">
        <NewItem onAddNew={onAddNew} />
      </div>

      {items.map((t, i) => (
        <Item
          item={t}
          key={i}
          onSetIcon={setIconSelector}
          onRemove={() => {
            const newItems = [...items]
            newItems.splice(i, 1)

            setItems(newItems)
          }}
          onUpdate={(newItem) => {
            setItems(items.map((t, ix) => (ix == i ? newItem : t)))
          }}
        />
      ))}

      <IconSelectorModal
        open={!!iconSelector}
        activeIcon={iconSelector?.type !== 'header' ? iconSelector?.icon : undefined}
        onChangeIcon={onSetIcon}
        onClose={() => setIconSelector(undefined)}
      />
    </Layout>
  )
}
