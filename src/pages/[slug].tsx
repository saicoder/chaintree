import { ProfileRender } from '@/components/profile-render'
import { useProfile } from '@/services/profile'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { profile, rehydrate } = useProfile()

  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'visible') rehydrate()
    }

    document.addEventListener('visibilitychange', handler)

    return () => {
      document.removeEventListener('visibilitychange', handler)
    }
  }, [])

  return <ProfileRender profile={profile} />
}
