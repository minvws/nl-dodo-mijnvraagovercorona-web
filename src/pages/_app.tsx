/** @jsx jsx */
import React from 'react';
import Head from 'next/head';

import { Alert, jsx, ThemeProvider } from 'theme-ui';

import { AdviceProvider } from 'components/advice/AdviceContext';

import theme from 'utilities/styling/theme';
import 'styles/global.css';
import 'styles/components/PeriodSelect.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';

const TravelCheckApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<Alert
					sx={{
						backgroundColor: 'button',
						borderRadius: 0,
						fontSize: '14px',
						padding: '4px',
					}}
				>
					<p sx={{ margin: 0 }}>Deze site is nog in de testfase.</p>
				</Alert>
				<AdviceProvider>
					<Component {...pageProps} />
				</AdviceProvider>
			</ThemeProvider>
		</>
	);
};

export default TravelCheckApp;
