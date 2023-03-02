import React, { useContext, useState } from 'react'
import { EXAMPLE_ITEMS, ProfileItem } from './link'
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
  slug: 'john',
  image: '',
  name: 'John Doe',
  bio: 'example bio',
  items: [...EXAMPLE_ITEMS],
  theme: { ...DEFAULT_THEME },
}

export interface ProfileContext {
  profile: Profile
  update: (_: Partial<Profile>) => void
}

export const ProfileContext = React.createContext<ProfileContext>({
  profile: DEFAULT_PROFILE,
  update: () => false,
})

export const useProfile = () => useContext(ProfileContext)

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)

  const update = (params: Partial<Profile>) => {
    setProfile({ ...profile, ...params })
  }

  return (
    <ProfileContext.Provider
      value={{
        profile,
        update,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
