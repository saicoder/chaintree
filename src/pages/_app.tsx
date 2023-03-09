import { SolanaWalletConnector } from '@/components/solana-wallet-connector'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaWalletConnector>
      <Component {...pageProps} />
    </SolanaWalletConnector>
  )
}
