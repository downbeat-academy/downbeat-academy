import { Flex } from 'cadence-core'
import s from './authors.module.css'

import type { FeaturedItemDescriptionProps } from './types'

const FeaturedItemDescription = ({ children }) => {
	return (
		<Flex tag="div" className={s.root} padding='3x-large'>
			{children}
		</Flex>
	)
}

FeaturedItemDescription.displayName = 'FeaturedItemDescription'
const Description = FeaturedItemDescription

export { FeaturedItemDescription, Description }
export type { FeaturedItemDescriptionProps }
