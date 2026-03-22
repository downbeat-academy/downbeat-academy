import { Text } from 'cadence-core'
import { UsersTable } from './users-table'
import s from '../../admin.module.css'

export default function UsersPage() {
	return (
		<div>
			<div className={s['admin-page-header']}>
				<Text type="expressive-headline" size="h3" tag="h1" color="brand">
					Users
				</Text>
			</div>
			<UsersTable />
		</div>
	)
}
