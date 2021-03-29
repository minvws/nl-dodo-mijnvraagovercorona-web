import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'theme-ui';

import { theme } from '@quarantaine/common';

import '@quarantaine/common/src/theme/global.css';
import '@reach/dialog/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, user-scalable=yes"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
