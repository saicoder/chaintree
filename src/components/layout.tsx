import Head from 'next/head'
import { Logo } from './icon'
import { IoIosLink, IoMdBrush } from 'react-icons/io'
import Link from 'next/link'
import { ProfileRender } from './profile-render'
import { useProfile } from '@/services/profile'
import { useRef } from 'react'
import { Button } from './button'
import Image from 'next/image'
import Jazzicon from 'react-jazzicon'
import { seedFromString } from '@/services/util'
import { resolveUrl } from '@/services/ipfs'
import { useRouter } from 'next/router'
import { IoEyeOutline, IoShareOutline } from 'react-icons/io5'

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter()
  const { profile, isChanged, commitChanges } = useProfile()
  const shareInput = useRef<HTMLInputElement | null>(null)

  const share = () => {
    if (!shareInput.current) return

    shareInput.current.select()
    document.execCommand('copy')
    alert('Link copied to clipboard')
  }

  return (
    <>
      <Head>
        <title>Chain Tree</title>
        <meta name="description" content="Chain Tree" />
      </Head>
      <main className="flex flex-col h-screen">
        <div className="z-10 flex items-center h-16 shadow-sm">
          <div className="container flex items-center mx-auto">
            <Logo />
            <Link
              href="/"
              className="flex items-center h-16 p-3 ml-8 text-gray-700 cursor-pointer hover:bg-gray-50"
              style={{ color: pathname === '/' ? 'black' : undefined }}
            >
              <IoIosLink size={22} />
              <div className="ml-2 text-base font-semibold">Links</div>
            </Link>
            <Link
              href="/theme"
              className="flex items-center h-16 p-3 ml-6 text-gray-700 cursor-pointer hover:bg-gray-50"
              style={{ color: pathname === '/theme' ? 'black' : undefined }}
            >
              <IoMdBrush size={22} />
              <div className="ml-2 text-base font-semibold">Theme</div>
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
                  className={`h-10 transition-all mx-5 border-r ${
                    isChanged ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>
              </div>
            </div>

            <div className="flex items-center px-1 cursor-pointer hover:opacity-75">
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
              <div className="max-w-2xl mx-auto mt-6">{children}</div>
            </div>
          </div>
          <div className="relative flex flex-col items-center justify-center w-full max-w-lg border-l">
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
              <ProfileRender profile={profile} />
            </div>

            <div className="absolute -top-96">
              <input
                ref={(e) => (shareInput.current = e)}
                type="text"
                value={`${process.env.NEXT_PUBLIC_ROOT_URL}/${profile.slug}`}
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

              <Link
                className="flex items-center justify-center mt-3 bg-white rounded-full shadow-sm cursor-pointer w-9 h-9 hover:opacity-75"
                href="/preview"
                title="Preview"
                target="_blank"
              >
                <IoEyeOutline size={24} className="text-gray-700" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
