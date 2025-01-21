import { Flex } from 'cadence-core'
import s from './authors.module.scss'

import type { FeaturedItemDescriptionProps } from './types'

const FeaturedItemDescription = ({ children }) => {
	return (
		<Flex tag="div" className={s.root}>
			{children}
		</Flex>
	)
}

FeaturedItemDescription.displayName = 'FeaturedItemDescription'
const Description = FeaturedItemDescription

export { FeaturedItemDescription, Description }
export type { FeaturedItemDescriptionProps }
