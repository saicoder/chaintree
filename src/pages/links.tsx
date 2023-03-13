import { Layout } from '../components/layout'
import { LinkType, ProfileItem } from '../services/link'

import { Item } from '../components/item'
import { useState } from 'react'
import IconSelectorModal from '../components/icon-selector-modal'
import { NewItem } from '../components/new-item'
import { SortableList } from '@/components/sortable-list'
import { nanoid } from 'nanoid'
import { useProfileEditor } from '@/hooks/useProfileEditor'
import { useAccount } from '@/hooks/useAccount'

export default function Home() {
  const { publicKey } = useAccount()
  const {
    profile: { items },
    update,
  } = useProfileEditor()

  const setItems = (items: ProfileItem[]) => {
    update({ items })
  }

  const [iconSelector, setIconSelector] = useState<ProfileItem>()

  const onSetIcon = (icon: string) => {
    setItems(items.map((t) => (t == iconSelector ? { ...iconSelector, icon } : t)))

    setIconSelector(undefined)
  }

  const onAddNew = (type: LinkType) => {
    const addNew = (item: ProfileItem) => {
      setItems([...items, item])
    }

    if (type === 'header') addNew({ type: 'header', label: '', id: nanoid() })
    if (type === 'link') addNew({ type: 'link', label: '', url: '', id: nanoid() })
    if (type === 'wallet')
      addNew({
        type: 'wallet',
        label: '',
        address: publicKey || '',
        blockchain: 'Solana',
        id: nanoid(),
      })
  }

  return (
    <Layout>
      <div className="py-5">
        <NewItem onAddNew={onAddNew} />
      </div>

      <SortableList
        items={items}
        extractKey={(t) => t.id}
        onListReorder={(items) => setItems(items)}
        renderItem={(t, handle) => (
          <Item
            item={t}
            key={t.id}
            onSetIcon={setIconSelector}
            handle={handle}
            onRemove={() => {
              setItems(items.filter((tx) => tx.id !== t.id))
            }}
            onUpdate={(newItem) => {
              setItems(items.map((tx) => (tx.id === t.id ? newItem : tx)))
            }}
          />
        )}
      />

      <IconSelectorModal
        open={!!iconSelector}
        activeIcon={iconSelector?.type !== 'header' ? iconSelector?.icon : undefined}
        onChangeIcon={onSetIcon}
        onClose={() => setIconSelector(undefined)}
      />
    </Layout>
  )
}
