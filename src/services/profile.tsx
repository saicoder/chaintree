import { EXAMPLE_ITEMS, ProfileItem } from './link'
import { DEFAULT_THEME, Theme } from './theme'
import { createJSONStorage, persist } from 'zustand/middleware'

import { create } from 'zustand'
import { useCallback } from 'react'

import { isEqual } from 'lodash'

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
  items: [...EXAMPLE_ITEMS],
  theme: { ...DEFAULT_THEME },
}

export interface ProfileStore {
  chainProfile: Profile
  profile: Profile
  isChanged: boolean

  set: (_: Partial<ProfileStore>) => void
  get: () => ProfileStore
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const useProfileStore = create(
  persist<ProfileStore>(
    (set, get) => ({
      get,
      set,

      chainProfile: DEFAULT_PROFILE,
      profile: DEFAULT_PROFILE,
      isChanged: false,
    }),
    {
      name: 'chaintree-store',
      storage: createJSONStorage(() => ({
        getItem: async (name) => {
          await wait(80)
          return localStorage.getItem(name)
        },
        setItem: (name, value) => Promise.resolve(localStorage.setItem(name, value)),
        removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
      })),
    }
  )
)

export const useProfile = () => {
  const { profile, isChanged, get, set } = useProfileStore()

  const update = useCallback(
    (params: Partial<Profile>) => {
      const { profile, chainProfile } = get()

      const newProfile = { ...profile, ...params }
      const isChanged = !isEqual(chainProfile, newProfile)

      set({ profile: newProfile, isChanged })
    },
    [get, set]
  )

  const commitChanges = async () => {
    const { profile } = get()
    set({ chainProfile: profile, isChanged: false })
  }

  const rehydrate = () => {
    try {
      const { state } = JSON.parse(localStorage.getItem('chaintree-store')!)
      set(state)
    } catch (ex) {}
  }

  return { profile, update, isChanged, commitChanges, rehydrate }
}
