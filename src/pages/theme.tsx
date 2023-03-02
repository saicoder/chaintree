import { Layout } from '@/components/layout'
import { useProfile } from '@/services/profile'
import { Theme } from '@/services/theme'

export default function ThemePage() {
  const { update, profile } = useProfile()
  const theme = profile.theme

  const updateTheme = (params: Partial<Theme>) => {
    update({ theme: { ...theme, ...params } })
  }

  return (
    <Layout>
      <div className="mt-2 text-lg font-semibold text-gray-800">Profile</div>
      <div className="p-5 mt-4 bg-white rounded-lg shadow-sm">
        <div className="flex">
          <div className="">
            <div className="relative w-24 overflow-hidden bg-gray-100 rounded-full aspect-square">
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full cursor-pointer">
                <div className="flex-1 text-xs font-semibold text-center text-gray-400">
                  Pick Image
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 pl-6">
            <div className="px-3 py-2 bg-gray-100 rounded-lg">
              <label htmlFor="name" className="block text-xs font-medium text-gray-500">
                Profile Name
              </label>
              <input
                id="name"
                className="w-full mt-2 text-base bg-transparent outline-none"
                type="text"
                value={profile.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="Profile Name"
              />
            </div>

            <div className="px-3 py-2 mt-3 bg-gray-100 rounded-lg">
              <label htmlFor="name" className="block text-xs font-medium text-gray-500">
                Bio
              </label>
              <textarea
                id="name"
                value={profile.bio}
                onChange={(e) => update({ bio: e.target.value })}
                className="w-full mt-2 text-base bg-transparent outline-none"
                placeholder="Profile description"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMIZE THEME */}
      <div className="mt-20 text-lg font-semibold text-gray-800">Customize Theme</div>
      <div className="p-5 mt-4 bg-white rounded-lg shadow-sm">
        <div className="px-3 py-2 bg-gray-100 rounded-lg">
          <label htmlFor="name" className="block text-xs font-medium text-gray-500">
            Background Image
          </label>
          <input
            id="name"
            className="w-full mt-2 text-base bg-transparent outline-none"
            type="url"
            placeholder="URL To Image"
            value={theme.bg}
            onChange={(e) => updateTheme({ bg: e.target.value })}
          />
        </div>

        <hr className="my-4 -mx-5" />
        <div className="mb-4 text-sm font-bold text-gray-400">BUTTON</div>

        <div className="px-3 py-2 bg-gray-100 rounded-lg">
          <label htmlFor="name" className="block text-xs font-medium text-gray-500">
            Button Background
          </label>
          <input
            id="name"
            className="w-10 h-10 mt-2 overflow-hidden text-base bg-transparent rounded-md outline-none"
            type="color"
            placeholder="URL To Image"
            value={theme.buttonBg}
            onChange={(e) => updateTheme({ buttonBg: e.target.value })}
          />
        </div>

        <div className="px-3 py-2 mt-4 bg-gray-100 rounded-lg">
          <label htmlFor="name" className="block text-xs font-medium text-gray-500">
            Button Text Color
          </label>
          <input
            id="name"
            className="w-10 h-10 mt-2 overflow-hidden text-base bg-transparent rounded-md outline-none"
            type="color"
            value={theme.buttonTextColor}
            onChange={(e) => updateTheme({ buttonTextColor: e.target.value })}
          />
        </div>

        <div className="px-3 py-2 mt-4 bg-gray-100 rounded-lg">
          <label htmlFor="name" className="block text-xs font-medium text-gray-500">
            Button Roundness
          </label>
          <input
            id="name"
            className="mt-2 overflow-hidden text-base bg-transparent rounded-md outline-none"
            type="text"
            placeholder="Percentage"
            value={theme.buttonRoundness}
            onChange={(e) => updateTheme({ buttonRoundness: e.target.value })}
          />
        </div>

        <div className="px-3 py-2 mt-4 bg-gray-100 rounded-lg">
          <label htmlFor="name" className="block text-xs font-medium text-gray-500">
            Button Shadow
          </label>
          <select
            id="name"
            className="mt-2 overflow-hidden text-base bg-transparent rounded-md outline-none"
          >
            <option>None</option>
            <option>Soft</option>
            <option>Hard</option>
          </select>
        </div>

        <hr className="my-4 -mx-5" />
        <div className="mb-4 text-sm font-bold text-gray-400">FONT</div>

        <div className="px-3 py-2 bg-gray-100 rounded-lg">
          <label htmlFor="name" className="block text-xs font-medium text-gray-500">
            Font Color
          </label>
          <input
            id="name"
            className="w-10 h-10 mt-2 overflow-hidden text-base bg-transparent rounded-md outline-none"
            type="color"
            value={theme.textColor}
            onChange={(e) => updateTheme({ textColor: e.target.value })}
          />
        </div>

        <div className="px-3 py-2 mt-4 bg-gray-100 rounded-lg">
          <label htmlFor="name" className="block text-xs font-medium text-gray-500">
            Font
          </label>
          <select
            id="name"
            className="mt-2 overflow-hidden text-base bg-transparent rounded-md outline-none"
            value={theme.font}
            onChange={(e) => updateTheme({ font: e.target.value })}
          >
            <option>Roboto</option>
            <option>Segoe</option>
          </select>
        </div>
      </div>

      <div className="h-20"></div>
    </Layout>
  )
}
