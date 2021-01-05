/** @jsx jsx */
import React from 'react';
import Head from 'next/head';

import { Alert, jsx, ThemeProvider } from 'theme-ui';

import theme from '../utilities/styling/theme';
import '../styles/global.css';
import '../styles/components/PeriodSelect.css';
import { AppProps } from 'next/dist/next-server/lib/router/router';

const TravelCheckApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes"
				/>

				<title>Travel Check Development</title>
			</Head>
			<ThemeProvider theme={theme}>
				<Alert
					sx={{
						backgroundColor: 'button',
						borderRadius: 0,
						fontSize: '14px',
					}}
				>
					<p sx={{ margin: 0 }}>Deze site is nog in de testfase.</p>
				</Alert>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
};

export default TravelCheckApp;
