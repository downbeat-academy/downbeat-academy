import { Text, Flex } from '../../components'

export default function FlexPage() {
	return (
		<Flex direction="column" gap="base">
			<Text tag="h1" size="6x-large" type="expressive" category="headline">
				Flex
			</Text>
			<Flex direction="row" align="center" justify="space-between">
				<Text
					tag="p"
					size="base"
					type="expressive"
					category="body"
					collapse={true}
				>
					Item 1
				</Text>
				<Text
					tag="p"
					size="base"
					type="expressive"
					category="body"
					collapse={true}
				>
					Item 2
				</Text>
			</Flex>
		</Flex>
	)
}
