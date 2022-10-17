import type { NextPage } from 'next';
import { Flex } from '@/components/layout';
import { InlineNotification } from '@/components/notification';

const Home: NextPage = () => {
	return (
		<Flex direction='column' gap='5' css={{ maxWidth: '500px'}}>
			<InlineNotification
				title='Notification title'
				description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cras magna felis eget viverra tellus praesent. Pulvinar non, pellentesque etiam tincidunt diam ac sit.'
				type='error'
			/>
		</Flex>
	);
};

export default Home
