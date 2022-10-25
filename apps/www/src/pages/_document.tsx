import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from 'cadence-design-system';

export default class CustomDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<style
						id="stitches"
						dangerouslySetInnerHTML={{
							__html: getCssText(),
						}}
					/>
					<link rel="cannonical" href="https://downbeatacademy.com" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
