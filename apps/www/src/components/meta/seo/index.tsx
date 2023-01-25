import Head from 'next/head'
import { SeoProps } from './types'

const Seo = ({
	title = 'Top resources for advancing musicians, students, and educators',
	description,
	url,
	author,
	image,
	noindex = false,
}: SeoProps) => {
	const concatTitle = `${title} ♪ Downbeat Academy`
	const concatUrl = `https://downbeatacademy/${url}`
	const isNoIndex = noindex ? <meta name="robots" content="noindex" /> : null

	return (
		<Head>
			<title>{concatTitle}</title>
			<meta property="og:title" content={concatTitle} key="title" />
			{description && (
				<meta name="description" content={description} key="description" />
			)}
			{author && <meta name="author" content={author} />}
			{description && (
				<meta
					property="og:description"
					content={description}
					key="description"
				/>
			)}
			{url && <meta property="og:url" content={concatUrl} key="url" />}
			<meta property="og:type" content="website" />
			{image && <meta property="og:image" content={image} />}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={concatTitle} key="title" />
			<meta name="twitter:site" content="@downbeatacademy" />
			{author && <meta name="twitter:creator" content={author} />}
			{isNoIndex}
		</Head>
	)
}

export { Seo }
