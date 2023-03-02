export interface Theme {
  bg: string // image url or flat color

  // button
  buttonBg: string
  buttonTextColor: string
  buttonRoundness: string
  buttonShadow?: string

  // text and font
  font: string
  textColor: string
}

import t from './themes/pinky.json'

export const DEFAULT_THEME: Theme = t
//   bg: 'gray',
//   buttonBg: '#ff0000',
//   buttonTextColor: '##000000',
//   buttonRoundness: '10px',
//   font: '',
//   textColor: '#000000',
// }
