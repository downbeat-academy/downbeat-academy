import { Badge } from 'cadence-core'
import type { Role } from '@/lib/auth/permissions'

export const showAdminRole = (user: { role?: Role | string | null }) => {
  switch (user.role) {
    case 'admin':
      return <Badge type='info' size='large' text='Admin' />;
    case 'superAdmin':
      return <Badge type='info' size='large' text='Super Admin' />;
    default:
      return null;
  }
}
