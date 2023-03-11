import Head from 'next/head'
import logo from '../components/icon/icon.svg'
import Image from 'next/image'
import Link from 'next/link'

import {
  IoBarChartOutline,
  IoCashOutline,
  IoCheckmark,
  IoColorFillOutline,
  IoHomeOutline,
  IoLockClosedOutline,
  IoThumbsUpOutline,
} from 'react-icons/io5'
import { useAccount } from '@/hooks/useAccount'
import { useRef, useState } from 'react'
import { useProfileEditor } from '@/hooks/useProfileEditor'
import { DEFAULT_PROFILE } from '@/services/profile'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'

const features = [
  {
    name: 'Create a Profile',
    description:
      'Sign up and create your own Chain Tree profile. Add your social links, crypto addresses, and other information you want to share with the world.',
    icon: IoHomeOutline,
  },
  {
    name: 'Customize Appearance',
    description:
      'Choose from a variety of themes, colors, and backgrounds to personalize your profile and make it stand out.',
    icon: IoColorFillOutline,
  },
  {
    name: 'Accept Payments',
    description:
      'Easily accept payments in cryptocurrency by adding your wallet addresses to your Chain Tree profile. Monetize your online presence and start earning today.',
    icon: IoCashOutline,
  },
  {
    name: 'Analytics',
    description:
      "Get real-time insights into how many people are clicking on your links and where they're coming from. Use this information to optimize your online presence.",
    icon: IoBarChartOutline,
  },
  {
    name: 'Blockchain-Based',
    description:
      'All profiles are saved to the Solana blockchain, ensuring they are secure, decentralized, and immutable.',
    icon: IoLockClosedOutline,
  },
  {
    name: 'Easy to Use',
    description:
      'Chain Tree is designed to be easy to use, even for those without technical expertise. Sign up and start managing your online presence in minutes.',
    icon: IoThumbsUpOutline,
  },
]

const HomePage = () => {
  const router = useRouter()

  const { update } = useProfileEditor()
  const { connected, connectWallet, account, accountLoading, fetchAccountByUsername, publicKey } =
    useAccount()

  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [loading, setLoading] = useState(false)

  const usernameInput = useRef<HTMLInputElement>()

  const onClaim = async () => {
    if (!publicKey) {
      connectWallet()
      return
    }

    if (username.length < 3 || username.length > 30) {
      setUsernameError('Username should be between 3 and 30 characters long')
      return
    }

    if (!/^[a-z0-9]*$/.test(username)) {
      setUsernameError('Username can only contain lowercase letters and numbers')
      return
    }

    setUsernameError('')
    setLoading(true)

    const account = await fetchAccountByUsername(username)

    if (account) {
      setUsernameError('Username is taken')
      setLoading(false)
      return
    }

    update({
      ...DEFAULT_PROFILE,
      name: username,
      bio: 'My bio here',
      slug: username,
      items: [
        {
          type: 'wallet',
          address: publicKey,
          blockchain: 'Solana',
          id: nanoid(),
          label: 'My Wallet',
        },
      ],
    })

    router.push('/theme')
    setLoading(false)
  }

  return (
    <div className="bg-white isolate">
      <Head>
        <title>Chain Tree | Take control of your online identity.</title>
        <meta
          name="description"
          content="Create a personalized and secure online profile with Chain Tree, the blockchain-based platform for managing your social links and crypto payments. Get insights into link clicks and enjoy customizable themes. Join now and build your online presence"
        />
      </Head>

      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#30c48d" />
              <stop offset={1} stopColor="#30c48d" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="container max-w-6xl pt-6 mx-auto px-7 lg:px-14">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <img className="h-8" src={logo.src} alt="" />
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-sm font-semibold leading-6 text-gray-900">
              Pricing
            </a>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            {!connected && (
              <div
                onClick={connectWallet}
                className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:opacity-75"
              >
                Connect Wallet <span aria-hidden="true">&rarr;</span>
              </div>
            )}

            {connected && !account && (
              <div
                onClick={() => usernameInput.current?.focus()}
                className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:opacity-75"
              >
                Create Profile <span aria-hidden="true">&rarr;</span>
              </div>
            )}

            {!accountLoading && account && (
              <Link
                href="/links"
                className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer hover:opacity-75"
              >
                Dashboard <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="container max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="py-32 sm:py-48 lg:py-56">
                <div className="">
                  <h1 className="text-6xl font-bold leading-snug tracking-tight text-gray-900">
                    Take control of your online identity.
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Streamline your online presence, accept crypto payments, and easily share all
                    your links and profiles in one place with Chain Tree.
                  </p>
                  <div className="flex mt-10">
                    <div className="flex overflow-hidden text-gray-700 bg-gray-100 border-2 border-gray-100 rounded-xl h-14">
                      <div className="items-center hidden px-3 md:flex">
                        <div className="font-medium">https://chaintr.ee/</div>
                      </div>
                      <input
                        ref={(e) => (usernameInput.current = e || undefined)}
                        className="px-3 font-medium rounded-l outline-none bg-gray-50"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="your username"
                      />
                      <button
                        onClick={onClaim}
                        className="px-10 font-medium text-white bg-brand hover:opacity-75"
                      >
                        {loading ? 'Loading' : 'Claim'}
                      </button>
                    </div>
                  </div>

                  {usernameError && (
                    <div className="mt-2 text-sm font-medium text-red-500"> - {usernameError}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center px-20 pb-10 md:pb-0 md:px-28">
                <div className="w-full  aspect-[0.48] relative bg-gray-50 rounded-[40px] overflow-hidden border-8 border-black">
                  <img src="/hero3.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#e6662e" />
                  <stop offset={1} stopColor="#e6662e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* FEATURES */}

        <div className="py-24 bg-white sm:py-32" id="features">
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <div className="max-w-2xl mx-auto lg:text-center">
              {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2> */}
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Powerful features to boost your online presence
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">Some of our features include:</p>
            </div>
            <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                        <feature.icon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div className="py-24 bg-white sm:py-32" id="pricing">
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <div className="max-w-2xl mx-auto sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Simple no-tricks pricing
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Chain Tree offers a free service to help you build your online presence. Upgrade to
                our Pro tier for advanced analytics.
              </p>
            </div>
            <div className="max-w-2xl mx-auto mt-16 rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Forever Free</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Sign up for Chain Tree&apos;s free tier and enjoy access to all our essential
                  features, including profile creation, link and crypto payments, and basic
                  analytics.
                </p>
                <div className="flex items-center mt-10 gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                    What’s included
                  </h4>
                  <div className="flex-auto h-px bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-4 mt-8 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {features.slice(0, 4).map((feature) => (
                    <li key={feature.name} className="flex gap-x-3">
                      <IoCheckmark
                        className="flex-none w-5 h-6 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-2 -mt-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="py-10 text-center rounded-2xl bg-gray-50 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="max-w-xs px-8 mx-auto">
                    <p className="text-base font-semibold text-gray-600">Pro features</p>
                    <p className="flex items-baseline justify-center mt-6 gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">$10</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                        USD
                      </span>
                    </p>
                    <p className="mt-1 text-base font-semibold text-gray-500">per year</p>

                    <div className="block w-full px-3 py-2 mt-10 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Coming soon
                    </div>
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      Pro features will include advanced analytics and more professional themes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="flex px-6 py-10 mx-auto max-w-7xl lg:px-8">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{' '}
            <a href="https://linktr.ee/" className="hover:underline">
              Link Tree
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex-1"></div>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="mailto:saicoder.net@gmail.com" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </footer>
      </main>
    </div>
  )
}

export default HomePage
