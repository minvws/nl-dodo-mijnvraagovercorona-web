/** @jsxImportSource theme-ui */
// import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { jsx, Box } from 'theme-ui';

import {
	locales,
	App,
	generalContentNl,
	generalContentEn,
	StyledLink,
	ContentBlockDataProvider,
} from '@quarantaine/common';

import '@quarantaine/common/src/theme/global.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';
import GlobalContext, { defaultState } from 'utilities/global-context';
import { useState } from 'react';

const CheckApp = ({ Component, pageProps }) => {
	const localGlobalTranslations =
		pageProps.locale === 'en' ? generalContentEn : generalContentNl;
	const [contentVariables, setContentVariables] = useState({});
	const [history, setHistoryState] = useState(defaultState.history);
	const setHistory = (value: string[]) => {
		setHistoryState(value);
	};

	useEffect(() => {
		const fetchData = async () => {
			const { contentVariables } = await fetch(
				'/data/v1/content-variables.json',
			).then((response) => response.json());

			setContentVariables(contentVariables);
		};

		fetchData();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				history,
				setHistory,
			}}
		>
			<App
				locale={pageProps.locale}
				locales={[locales.dutch, locales.english]}
				pageContent={pageProps.page}
				siteSettings={pageProps.siteSettings}
				content={{ ...localGlobalTranslations }}
			>
				{pageProps.preview && (
					<Box sx={{ padding: '12px', textAlign: 'right' }}>
						<StyledLink
							href={`/api/exit-preview?slug=${pageProps.page?.url}`}
							styledAs="button"
						>
							Verlaat preview modus
						</StyledLink>
					</Box>
				)}
				<ContentBlockDataProvider contentVariables={contentVariables}>
					<Component {...pageProps} />
				</ContentBlockDataProvider>
			</App>
		</GlobalContext.Provider>
	);
};

export default CheckApp;
