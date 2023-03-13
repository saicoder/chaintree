export interface ItemIconProps {
  url: string
}

export function ItemIcon({ url, ...props }: any) {
  const name: string = url.replace('chaintree://icon/', '')
  const baseIcon = name.startsWith('ti') ? 'ti' : 'cf'

  return (
    <span
      {...props}
      className={`text-gray-400 text-2xl ${baseIcon} ${name} ${props.className}`}
    ></span>
  )
}
