import Head from 'next/head'
import { Logo } from './icon'
import { IoIosLink, IoMdBrush } from 'react-icons/io'
import Link from 'next/link'
import { ProfileRender } from './profile-render'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Chain Tree</title>
        <meta name="description" content="Chain Tree" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen">
        <div className="z-10 flex items-center h-16 shadow-sm">
          <div className="container flex items-center mx-auto">
            <Logo />

            <Link
              href="/"
              className="flex items-center p-2 ml-12 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <IoIosLink size={22} />
              <div className="ml-2 text-base font-semibold">Links</div>
            </Link>

            <Link
              href="/theme"
              className="flex items-center p-2 ml-8 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <IoMdBrush size={22} />
              <div className="ml-2 text-base font-semibold">Theme</div>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 bg-gray-100">
          <div className="relative flex-1">
            <div className="absolute w-full h-full overflow-scroll">
              <div className="max-w-2xl mx-auto mt-6">{children}</div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full max-w-lg border-l">
            <Link href="/asd">view</Link>
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
              <ProfileRender />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
