import { Flex } from 'cadence-design-system';
import { Title, Metadata } from './index';

type Props = {
	title: string;
	excerpt: string;
	date: string;
	lastUpdated: string;
	categories: Category[];
	authors: Author[];
};

type Author = {
	_type: string;
	name: string;
	slug: {
		current: string;
	};
	avatar: {
		image: {
			asset: string;
		};
	};
};

type Category = {
	_type: string;
	slug: {
		current: string;
	};
	title: string;
};

export const PostTitle = ({
	title,
	excerpt,
	categories,
	authors,
	date,
	lastUpdated,
}: Props) => {
	return (
		<Flex justify="center">
			<Flex
				direction="column"
				gap={8}
				css={{
					padding: '$8 $5',
					width: '1600px',

					'@md': {
						padding: '$8 $4',
						gap: '$5',
					},
				}}
			>
				<Title
					categories={categories}
					title={title}
					excerpt={excerpt}
				/>
				<Metadata
					authors={authors}
					date={date}
					lastUpdated={lastUpdated}
				/>
			</Flex>
		</Flex>
	);
};
