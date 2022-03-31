/** @jsx jsx */
import type { AppProps } from 'next/app';
import { jsx } from 'theme-ui';

import {
	locales,
	App,
	generalContentNl,
	generalContentEn,
} from '@quarantaine/common';

import '@quarantaine/common/src/theme/global.css';
import '@reach/dialog/styles.css';
import '@reach/menu-button/styles.css';
import GlobalContext, { defaultState } from 'utilities/global-context';
import { useState } from 'react';

const CheckApp = ({ Component, pageProps }: AppProps) => {
	const localGlobalTranslations =
		pageProps.locale === 'en' ? generalContentEn : generalContentNl;
	const [startPoint, setStartPointState] = useState(defaultState.startPoint);
	const [history, setHistoryState] = useState(defaultState.history);
	const setStartPoint = (value: string) => {
		setStartPointState(value);
	};
	const setHistory = (value: string[]) => {
		setHistoryState(value);
	};

	return (
		<GlobalContext.Provider
			value={{
				startPoint,
				history,
				setStartPoint,
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
				<Component {...pageProps} />
			</App>
		</GlobalContext.Provider>
	);
};

export default CheckApp;
