import Head from 'next/head';

type Props = {
	title?: string;
	description?: string;
	slug?: string;
	author?: string;
	image?: string;
	noindex?: boolean;
};

export const Seo = ({
	title = 'Resources for advancing musicians, students, and educators',
	description = 'Resources for advancing musicians, students, and educators',
	slug = 'https://downbeatacademy.com',
	author = 'Jory Tindall',
	image = '',
	noindex = false,
}: Props) => {
	return (
		<Head>
			<meta charSet="utf-8" />
			<title>{title || 'Downbeat Academy'} ♪ Downbeat Academy</title>
			{description && (
				<meta
					name="description"
					content={description}
					key="description"
				/>
			)}
			{title && (
				<meta
					property="og:title"
					content={title + ` ♪ Downbeat Academy`}
					key="title"
				/>
			)}
			{description && (
				<meta property="og:description" content={description} />
			)}
			{slug && (
				<meta
					property="og:url"
					content={`https://downbeatacademy.com/${slug}`}
				/>
			)}
			<meta property="og:type" content="website" />
			{image && <meta property="og:image" content={image || ''} />}
			<meta name="twitter:card" content="summary" />
			{title && <meta name="twitter:title" content={title} key="title" />}
			<meta name="twitter:site" content="@downbeatacademy" />
			{author && <meta name="twitter:creator" content={author} />}
			{author && <meta name="author" content={author} />}
			{/* {noindex && <meta name='robots' content={noindex === true ? 'noindex' : ''} />} */}
		</Head>
	);
};
