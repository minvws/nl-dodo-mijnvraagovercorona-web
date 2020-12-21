/** @jsx jsx */
import * as React from 'react';

import Document, { Html, Head, Main, NextScript } from 'next/document';

import { jsx } from 'theme-ui';
// import { Global } from '@emotion/core';

// import { defaults, fonts, reset } from '../utilities/styling/global';

class TravelCheckDocument extends Document {
	render() {
		return (
			<Html lang="nl">
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
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />
				</Head>
				<body>
					{/* <Global styles={reset} />
					<Global styles={fonts} />
					<Global styles={defaults} /> */}
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default TravelCheckDocument;
