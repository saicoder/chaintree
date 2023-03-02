import * as icons from 'react-icons/tb'

export interface ItemIconProps {
  url: string
}

export function ItemIcon({ url, ...props }: any) {
  const name = url.replace('chaintree://icon/', '')
  const Icon = (icons as any)[name]

  return <Icon fontSize={24} className="text-gray-400" {...props} />
}
