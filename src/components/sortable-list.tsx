import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

export type Handle = SyntheticListenerMap | undefined

export function SortableItem<T>({
  id,
  item,
  renderItem,
}: {
  id: any
  item: T
  renderItem: (_: T, handle: Handle) => React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    position: 'relative',
    zIndex: isDragging ? 100 : 0,
  } as React.CSSProperties

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {renderItem(item, listeners)}
    </div>
  )
}

export function SortableList<T>({
  items,
  extractKey,
  renderItem,
  onListReorder,
}: {
  items: T[]
  extractKey: (_: T) => string
  renderItem: (_: T, handle: Handle) => React.ReactNode
  onListReorder: (_: T[]) => void
}) {
  const sensors = useSensors(useSensor(PointerSensor))

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((t) => extractKey(t))}
        strategy={verticalListSortingStrategy}
      >
        {items.map((t, i) => {
          const id = extractKey(t)

          return <SortableItem key={id} id={id} renderItem={renderItem as any} item={t} />
        })}
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (!active || !over || active.id === over.id) return

    const oldIndex = items.findIndex((t) => active.id === extractKey(t))
    const newIndex = items.findIndex((t) => over.id === extractKey(t))

    onListReorder(arrayMove(items, oldIndex, newIndex))
  }
}
