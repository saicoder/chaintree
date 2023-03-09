import { ProfileRender } from '@/components/profile-render'
import { useProfile } from '@/services/profile'
import Head from 'next/head'
import { useEffect } from 'react'

export default function PreviewPage() {
  const { profile, rehydrate } = useProfile()

  useEffect(() => {
    const handler = () => document.visibilityState === 'visible' && rehydrate()

    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [rehydrate])

  return (
    <>
      <Head>
        <title>Preview | Chain Tree</title>
      </Head>
      <ProfileRender profile={profile} />

      <div className="absolute bottom-0 left-0 p-5 font-bold bg-white rounded-tr-2xl opacity-30">
        Preview Mode
      </div>
    </>
  )
}
