/** @jsx jsx */
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { jsx } from 'theme-ui';

class ReizenTijdensCoronaDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />

					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#154273" />
					<meta name="msapplication-TileColor" content="#154273" />
					<meta name="theme-color" content="#ffffff" />
				</Head>
				<body>
					<Main />
					<NextScript />

					<script src="/piwik.js"></script>
					<noscript>
						<iframe
							src="//statistiek.rijksoverheid.nl/containers/872e79b4-a648-4c3e-b890-d787b38802eb/noscript.html"
							height="0"
							width="0"
							style={{ border: '0', display: 'none', visibility: 'hidden' }}
						></iframe>
					</noscript>
				</body>
			</Html>
		);
	}
}

export default ReizenTijdensCoronaDocument;
