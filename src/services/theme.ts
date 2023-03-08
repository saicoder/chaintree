export interface Theme {
  name: string

  bgColor: string
  bgImage: string // image url or flat color

  // button
  buttonBg: string
  buttonTextColor: string
  buttonRoundness: string
  buttonShadow?: string

  // text and font
  font: string
  textColor: string
}

import { string } from '@tensorflow/tfjs'
import t from './themes/pinky.json'

export const DEFAULT_THEME: Theme = t
//   bg: 'gray',
//   buttonBg: '#ff0000',
//   buttonTextColor: '##000000',
//   buttonRoundness: '10px',
//   font: '',
//   textColor: '#000000',
// }
