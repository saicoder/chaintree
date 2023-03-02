import { ProfileProvider } from '@/services/profile'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProfileProvider>
      <Component {...pageProps} />
    </ProfileProvider>
  )
}
