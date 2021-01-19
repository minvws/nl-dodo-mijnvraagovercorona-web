/** @jsx jsx */
import React, { useEffect } from 'react';
import Head from 'next/head';

import { jsx, Box, ThemeProvider } from 'theme-ui';

import { AdviceProvider } from 'components/advice/AdviceContext';

import theme from 'utilities/styling/theme';
import 'styles/global.css';
import 'styles/components/PeriodSelect.css';

import Router, { AppProps } from 'next/dist/next-server/lib/router/router';
import { trackPageview } from 'utilities/piwik';

const TravelCheckApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		Router.events.on('routeChangeComplete', trackPageview);
		return () => {
			Router.events.off('routeChangeComplete', trackPageview);
		};
	}, []);

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<AdviceProvider>
					<Box
						sx={{
							minHeight: '100vh',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Component {...pageProps} />
					</Box>
				</AdviceProvider>
			</ThemeProvider>
		</>
	);
};

export default TravelCheckApp;
