import Document, { Html, Head, Main, NextScript } from 'next/document';

class CheckDocument extends Document {
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
							src="//statistiek.rijksoverheid.nl/containers/93e942cf-a2f0-45dc-babf-ad9c16c46d4b/noscript.html"
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

export default CheckDocument;
