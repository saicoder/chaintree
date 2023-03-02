import Image from 'next/image'
import icon from './icon.svg'

export function Logo() {
  return <Image alt="logo" height={30} src={icon} />
}
