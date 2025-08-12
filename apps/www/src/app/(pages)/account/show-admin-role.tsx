import { Badge } from 'cadence-core'

export const showAdminRole = (user: any) => {
  switch (user.role) {
    case 'admin':
      return <Badge type='info' size='large' text='👑 Admin' />;
    case 'superAdmin':
      return <Badge type='info' size='large' text='🚀 Super Admin' />;
    default:
      return null;
  }
}