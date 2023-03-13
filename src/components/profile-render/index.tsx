import { Profile } from '@/services/profile'
import { ItemIcon } from '../item-icon'
import Link from 'next/link'
import Image from 'next/image'
import Jazzicon from 'react-jazzicon'
import { resolveUrl } from '@/services/ipfs'
import { Theme } from '@/services/theme'
import { seedFromString } from '@/services/util'
import { PaymentModal } from './payment-modal'
import { ProfileItem, WalletAddress, isValidSolanaAddress, paymentUrlFor } from '@/services/link'
import { useState } from 'react'

export interface ProfileRenderProps {
  profile: Profile
  themeOverride?: Theme
  noEvents?: boolean
  zoom?: number
}

export function ProfileRender({ profile, themeOverride, noEvents, zoom }: ProfileRenderProps) {
  const theme = themeOverride || profile.theme
  const [currentWallet, setCurrentWallet] = useState<WalletAddress>()

  const onItemClick = (e: any, item: ProfileItem) => {
    if (item.type === 'wallet' && isValidSolanaAddress(item.address)) {
      e.preventDefault()
      setCurrentWallet(item)
    }

    if (item.type === 'link') {
      fetch(`/api/track?username=${profile.slug}&linkId=${item.id}&r=${Math.random()}`).then((t) =>
        t.json()
      )
    }
  }

  return (
    <div
      className="absolute w-full h-full"
      style={{
        backgroundColor: theme.bgColor,
        backgroundImage: `url('${theme.bgImage}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        pointerEvents: noEvents ? 'none' : undefined,
        zoom,
      }}
    >
      <PaymentModal wallet={currentWallet} onClose={() => setCurrentWallet(undefined)} />

      <div className="max-w-2xl px-4 mx-auto">
        {/* Profile Data */}
        <div className="relative w-24 h-24 mx-auto mt-8 overflow-hidden bg-gray-200 rounded-full">
          {profile.image?.trim().length === 0 && (
            <Jazzicon diameter={96} seed={seedFromString(profile.slug)} />
          )}

          {profile.image && <Image alt="profile image" src={resolveUrl(profile.image)} fill />}
        </div>

        <div className="mt-4 text-base font-bold text-center" style={{ color: theme.textColor }}>
          {profile.name}
        </div>

        <div
          className="mt-2 text-base font-medium text-center"
          style={{ color: theme.textColor, lineHeight: '1.2rem' }}
        >
          {profile.bio}
        </div>

        <div className="h-4"></div>

        {/* Items */}
        {profile.items.map((t, i) => {
          if (t.type === 'header') {
            return (
              <div
                key={i}
                className="mb-1 text-base font-medium text-center mt-7"
                style={{ color: theme.textColor }}
              >
                {t.label}
              </div>
            )
          }

          return (
            <Link
              href={t.type === 'link' ? t.url : paymentUrlFor(t) || '#'}
              target={t.type === 'link' ? '_blank' : undefined}
              onClick={(e) => onItemClick(e, t)}
              key={i}
              className="relative block py-4 my-3 text-base font-medium text-center transition-transform cursor-pointer hover:scale-105"
              style={{
                color: theme.buttonTextColor,
                background: theme.buttonBg,
                borderRadius: theme.buttonRoundness,
              }}
            >
              {t.label}

              {t.icon && (
                <ItemIcon
                  url={t.icon}
                  style={{
                    position: 'absolute',
                    top: 9,
                    left: 12,
                    color: theme.buttonTextColor,
                  }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
