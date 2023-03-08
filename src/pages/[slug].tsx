import { ProfileRender } from '@/components/profile-render'
import { useProfile } from '@/services/profile'

export default function ProfilePage() {
  const { profile } = useProfile()
  return <ProfileRender profile={profile} />
}
