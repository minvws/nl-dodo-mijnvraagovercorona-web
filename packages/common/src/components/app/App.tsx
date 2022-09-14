/** @jsxImportSource theme-ui */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { jsx, Box } from 'theme-ui';

import { ThemeProvider } from '@theme-ui/core';

import {
	theme,
	usePiwik,
	TranslationProvider,
	Locale,
	Locales,
} from '@quarantaine/common';

interface AppProps {
	locale: Locales;
	locales: Locale[];
	content: { [key: string]: string };
	siteSettings: unknown;
	pageContent: unknown;
}

export const App: React.FC<AppProps> = ({
	children,
	locale,
	locales,
	content,
	siteSettings,
	pageContent,
}) => {
	usePiwik();
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, user-scalable=yes"
				/>
			</Head>
			<TranslationProvider
				locale={locale}
				locales={locales}
				sanityPageContent={pageContent}
				siteSettings={siteSettings}
				content={content}
			>
				<ThemeProvider theme={theme}>
					<Box
						sx={{
							minHeight: '100vh',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{children}
					</Box>
				</ThemeProvider>
			</TranslationProvider>
		</>
	);
};
