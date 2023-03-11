import { SolanaWalletConnector } from '@/components/solana-wallet-connector'
import { AccountContextProvider } from '@/hooks/useAccount'
import { ProfileEditorProvider } from '@/hooks/useProfileEditor'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaWalletConnector>
      <AccountContextProvider>
        <ProfileEditorProvider>
          <Component {...pageProps} />
        </ProfileEditorProvider>
      </AccountContextProvider>
    </SolanaWalletConnector>
  )
}
