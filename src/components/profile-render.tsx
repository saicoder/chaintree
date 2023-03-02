import { useProfile } from '@/services/profile'
import { ItemIcon } from './item-icon'
import Link from 'next/link'

export function ProfileRender() {
  const { profile } = useProfile()
  console.log(profile.theme)

  return (
    <div
      className="absolute w-full h-full"
      style={{
        background: profile.theme.bg,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-2xl px-4 mx-auto">
        {/* Profile Data */}
        <div className="w-24 h-24 mx-auto mt-8 bg-gray-200 rounded-full"></div>

        <div
          className="mt-4 text-base font-bold text-center"
          style={{ color: profile.theme.textColor }}
        >
          {profile.name}
        </div>

        <div
          className="mt-2 text-base font-medium text-center"
          style={{ color: profile.theme.textColor, lineHeight: '1.2rem' }}
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
                style={{ color: profile.theme.textColor }}
              >
                {t.label}
              </div>
            )
          }

          return (
            <Link
              href={t.type === 'link' ? t.url : '#'}
              target="_blank"
              key={i}
              className="relative block py-4 my-3 text-base font-medium text-center transition-transform cursor-pointer hover:scale-105"
              style={{
                color: profile.theme.buttonTextColor,
                background: profile.theme.buttonBg,
                borderRadius: profile.theme.buttonRoundness,
              }}
            >
              {t.label}

              {t.icon && (
                <ItemIcon
                  url={t.icon}
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    color: profile.theme.buttonTextColor,
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
