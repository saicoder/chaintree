import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { DEFAULT_PROFILE, Profile } from '@/services/profile'
import { useAccount } from './useAccount'
import { isEqual } from 'lodash'

export interface ProfileEditorContext {
  profile: Profile
  update: (_: Partial<Profile>) => void
  isChanged: boolean
}

export const ProfileEditorContext = React.createContext<ProfileEditorContext>({
  profile: DEFAULT_PROFILE,
  update: () => false,
  isChanged: false,
})

export const useProfileEditor = () => useContext(ProfileEditorContext)

export const ProfileEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const { chainProfile } = useAccount()
  const [profile, setProfile] = useState<Profile>(chainProfile || DEFAULT_PROFILE)

  useEffect(() => {
    setProfile(chainProfile || DEFAULT_PROFILE)
  }, [chainProfile])

  const update = useCallback((params: Partial<Profile>) => {
    setProfile((profile) => ({ ...profile, ...params }))
  }, [])

  const isChanged = useMemo(() => !isEqual(profile, chainProfile), [chainProfile, profile])

  return (
    <ProfileEditorContext.Provider
      value={{
        isChanged,
        profile,
        update,
      }}
    >
      {children}
    </ProfileEditorContext.Provider>
  )
}
