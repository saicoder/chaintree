import { resolveUrl } from './ipfs'
import { ProfileItem } from './link'
import { DEFAULT_THEME, Theme } from './theme'

export interface Profile {
  slug: string
  image: string
  name: string
  bio: string

  theme: Theme
  items: ProfileItem[]
}

export const DEFAULT_PROFILE: Profile = {
  slug: '',
  image: '',
  name: '',
  bio: '',
  items: [],
  theme: { ...DEFAULT_THEME },
}

export const fetchProfile = (params: {
  metadataUrl: string
  metadataHash: number[]
}): Promise<Profile | undefined> => {
  return fetch(resolveUrl(params.metadataUrl))
    .then((t) => t.json())
    .catch(() => undefined)
}
