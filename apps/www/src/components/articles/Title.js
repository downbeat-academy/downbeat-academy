import { H1, Paragraph, Flex, Grid } from 'cadence-design-system';
import { CategoryLink } from './CategoryLink';

export const Title = ({ categories, title, excerpt }) => {
	return (
		<>
			<Flex direction="row" gap={3} align="center">
				{categories &&
					categories.map((category) => {
						return (
							<CategoryLink
								slug={category.slug.current}
								text={category.title}
								key={category.title}
							/>
						);
					})}
			</Flex>
			<Grid
				columns="2"
				align="end"
				css={{
					'@lg': {
						display: 'flex',
						flexDirection: 'column',
						gap: '$5',
						alignItems: 'start',
					},
				}}
			>
				<Flex
					direction="column"
					css={{ flexGrow: '1', flexBasis: 'auto' }}
				>
					{title && (
						<H1
							context="display"
							css={{ color: '$passionFruit600' }}
						>
							{title}
						</H1>
					)}
				</Flex>
				<Flex
					direction="column"
					css={{ flexGrow: '1', flexBasis: 'auto' }}
				>
					{excerpt && (
						<Paragraph
							context="display"
							size="large"
							css={{ margin: '0' }}
						>
							{excerpt}
						</Paragraph>
					)}
				</Flex>
			</Grid>
		</>
	);
};
