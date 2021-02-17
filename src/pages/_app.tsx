/** @jsx jsx */
import React, { useEffect } from 'react';
import Head from 'next/head';
import Router, { AppProps } from 'next/dist/next-server/lib/router/router';

import { jsx, Box, ThemeProvider } from 'theme-ui';

import { AdviceProvider } from 'components/advice/AdviceContext';
import { trackPageview } from 'utilities/piwik';

import theme from 'utilities/styling/theme';
import 'styles/global.css';
import 'styles/components/PeriodSelect.css';
import { TranslationProvider } from 'hooks/translation';
import { generalContentEn, generalContentNl } from 'content/_general-content';

const ReizenTijdensCoronaApp = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		Router.events.on('routeChangeComplete', trackPageview);
		return () => {
			Router.events.off('routeChangeComplete', trackPageview);
		};
	}, []);
	useEffect(() => {
		document.documentElement.lang = pageProps.locale;
	}, [pageProps.locale]);

	const pageTranslations = pageProps.content || {};
	const globalTranslations =
		pageProps.locale === 'en' ? generalContentEn : generalContentNl;

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, user-scalable=yes"
				/>
			</Head>
			<TranslationProvider
				locale={pageProps.locale}
				content={{ ...pageTranslations, ...globalTranslations }}
			>
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
			</TranslationProvider>
		</>
	);
};

export default ReizenTijdensCoronaApp;
