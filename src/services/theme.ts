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

import defaultTheme from './themes/black.json'
export const DEFAULT_THEME: Theme = defaultTheme
