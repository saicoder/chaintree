import Head from 'next/head'
import { Logo } from './icon'
import { IoIosLink, IoMdBrush } from 'react-icons/io'
import Link from 'next/link'
import { ProfileRender } from './profile-render'
import { useRef } from 'react'
import { Button } from './button'
import Image from 'next/image'
import Jazzicon from 'react-jazzicon'
import { seedFromString } from '@/services/util'
import { resolveUrl } from '@/services/ipfs'
import { useRouter } from 'next/router'
import { IoBarChartOutline, IoEyeOutline, IoShareOutline } from 'react-icons/io5'
import { useProfileEditor } from '@/hooks/useProfileEditor'
import { useAccount } from '@/hooks/useAccount'
import { ConfirmationProgress } from './confirmation-progress'

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter()
  const { profile, isChanged } = useProfileEditor()
  const { chainProfile, saveProfile } = useAccount()
  const shareInput = useRef<HTMLInputElement | null>(null)

  const share = () => {
    if (!shareInput.current) return
    if (!chainProfile) {
      alert('Please save your profile first')
      return
    }

    shareInput.current.select()
    document.execCommand('copy')
    alert('Link copied to clipboard')
  }

  const commitChanges = () => {
    saveProfile(profile)
  }

  return (
    <>
      <Head>
        <title>Chain Tree</title>
        <meta name="description" content="Chain Tree" />
      </Head>
      <ConfirmationProgress />
      <main className="flex flex-col h-screen">
        <div className="z-10 flex items-center h-16 shadow-sm">
          <div className="container flex items-center px-2 mx-auto md:px-0">
            <Link href="/">
              <Logo />
            </Link>
            <Link
              href="/links"
              className="flex items-center h-16 p-3 ml-4 text-gray-700 cursor-pointer md:ml-8 hover:bg-gray-50"
              style={{ color: pathname === '/links' ? 'black' : undefined }}
              prefetch
            >
              <IoIosLink size={22} />
              <div className="ml-2 text-base font-semibold">Links</div>
            </Link>
            <Link
              href="/theme"
              className="flex items-center h-16 p-3 text-gray-700 cursor-pointer md:ml-6 hover:bg-gray-50"
              style={{ color: pathname === '/theme' ? 'black' : undefined }}
              prefetch
            >
              <IoMdBrush size={22} />
              <div className="ml-2 text-base font-semibold">Theme</div>
            </Link>

            <Link
              href="/analytics"
              className="flex items-center h-16 p-3 text-gray-700 cursor-pointer md:ml-6 hover:bg-gray-50"
              style={{ color: pathname === '/analytics' ? 'black' : undefined }}
              prefetch
            >
              <IoBarChartOutline size={22} />
              <div className="ml-2 text-base font-semibold">Analytics</div>
            </Link>

            <div className="flex-1"></div>

            {/* PROFILE IMAGE */}
            <div className="overflow-hidden">
              <div className={`flex items-center`}>
                <Button
                  onClick={commitChanges}
                  className={`w-20 transition-all ${
                    isChanged
                      ? 'translate-x-0 opacity-100 '
                      : 'translate-x-20 opacity-0 pointer-events-none'
                  }`}
                >
                  Save
                </Button>
                <div
                  className={`hidden md:block h-10 transition-all mx-5 border-r ${
                    isChanged ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>
              </div>
            </div>

            <div className="items-center hidden px-1 cursor-pointer md:flex hover:opacity-75">
              <div className="mr-3 text-sm font-medium text-gray-700">{profile.name}</div>
              <div className="relative w-10 h-10 overflow-hidden bg-gray-200 border rounded-full">
                {profile.image?.trim().length === 0 && (
                  <Jazzicon diameter={40} seed={seedFromString(profile.slug)} />
                )}

                {profile.image && (
                  <Image alt="profile image" src={resolveUrl(profile.image)} fill />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 bg-gray-100">
          <div className="relative flex-1">
            <div className="absolute w-full h-full overflow-scroll">
              <div className="max-w-2xl px-4 mx-auto mt-6 md:px-0">{children}</div>
            </div>
          </div>
          <div className="relative flex-col items-center justify-center hidden w-full max-w-lg border-l md:flex">
            <div
              className="bg-white"
              style={{
                height: '70vh',
                aspectRatio: '0.48',
                borderColor: 'black',
                borderWidth: 14,
                borderRadius: 50,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <ProfileRender zoom={0.95} profile={profile} />
            </div>

            <div className="absolute -top-96">
              <input
                ref={(e) => (shareInput.current = e)}
                type="text"
                onChange={() => false}
                value={`${process.env.NEXT_PUBLIC_ROOT_URL}/${chainProfile?.slug}`}
              />
            </div>

            <div className="absolute top-3 right-3">
              <div
                className="flex items-center justify-center bg-white rounded-full shadow-sm cursor-pointer w-9 h-9 hover:opacity-75"
                onClick={share}
                title="Share"
              >
                <IoShareOutline size={24} className="text-gray-700" />
              </div>

              {chainProfile && (
                <Link
                  className="flex items-center justify-center mt-3 bg-white rounded-full shadow-sm cursor-pointer w-9 h-9 hover:opacity-75"
                  href={`/${chainProfile.slug}`}
                  title="Preview"
                  target="_blank"
                >
                  <IoEyeOutline size={24} className="text-gray-700" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
