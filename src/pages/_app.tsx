/** @jsx jsx */
import React, { useEffect } from 'react';
import Head from 'next/head';

import { Alert, jsx, ThemeProvider, Flex } from 'theme-ui';

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
					<Flex sx={{ flexDirection: 'column', minHeight: '100vh' }}>
						<Alert
							sx={{
								backgroundColor: 'button',
								borderRadius: 0,
								fontSize: '14px',
								padding: '4px',
							}}
						>
							<p sx={{ margin: 0 }}>
								Deze site is nog in de testfase. Help ons verder via de knop
								‘deel je mening’.
							</p>
						</Alert>
						<Component {...pageProps} />
					</Flex>
				</AdviceProvider>
			</ThemeProvider>
		</>
	);
};

export default TravelCheckApp;
