import Document, { Html, Main, NextScript, Head } from 'next/document'

export default class CustomDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
