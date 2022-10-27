import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import {
	Paragraph,
	Button,
	Flex,
	Avatar,
	H2,
	Badge,
} from 'cadence-design-system';
import { Seo } from '@components/meta';

export default function Account() {
	const { user, error, isLoading } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/api/auth/login');
		}
	}, [user, router]);

	if (isLoading) return <Paragraph>Loading user...</Paragraph>;
	if (error) return <div>{error.message}</div>;

	return (
		user && (
			<>
				<Seo title="Your Account" />
				<Flex
					direction="column"
					gap="6"
					css={{
						maxWidth: '65ch',
						margin: '0 auto',
						padding: '$10 $5',
					}}
				>
					<Avatar size="large" name={user.name}>
						<Image
							src={user.picture}
							alt={user.name}
							width={80}
							height={80}
						/>
					</Avatar>
					<Badge
						type="informational"
						style="fill"
						css={{ alignSelf: 'start' }}
					>
						Account
					</Badge>
					<H2 as="h1" context="display">
						Hello, {user.name}!
					</H2>
					<Paragraph>
						We&apos;re still working to add more features and
						content to this page, but sit tight for now!
					</Paragraph>
					<Link href="/api/auth/logout" passHref>
						<Button size="medium" variant="secondary" as="a">
							Log out
						</Button>
					</Link>
				</Flex>
			</>
		)
	);
}

export const getServerSideProps = withPageAuthRequired();
