/** @jsx jsx */
import React, { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Router from 'next/router';

import { jsx, Box, ThemeProvider } from 'theme-ui';

import { trackPageview } from 'utilities/piwik';
import theme from 'utilities/styling/theme';

import { AdviceProvider } from 'components/advice/AdviceContext';

import { TranslationProvider } from 'hooks/translation';

import { generalContentEn, generalContentNl } from 'content/_general-content';
import { countriesEn, countriesNl } from 'content/countries';

import 'styles/global.css';
import 'styles/components/PeriodSelect.css';

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

	const localGlobalTranslations =
		pageProps.locale === 'en' ? generalContentEn : generalContentNl;
	const localCountryTranslations =
		pageProps.locale === 'en' ? countriesEn : countriesNl;

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
				sanityPageContent={pageProps.page}
				siteSettings={pageProps.siteSettings}
				content={{
					...pageProps.localPageTranslations,
					...localGlobalTranslations,
					...localCountryTranslations,
				}}
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
