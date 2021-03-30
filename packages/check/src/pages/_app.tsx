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

const CheckApp = ({ Component, pageProps }: AppProps) => {
	const localGlobalTranslations =
		pageProps.locale === 'en' ? generalContentEn : generalContentNl;

	return (
		<App
			locale={pageProps.locale}
			locales={[locales.dutch]}
			pageContent={pageProps.page}
			siteSettings={pageProps.siteSettings}
			content={{ ...localGlobalTranslations }}
		>
			<Component {...pageProps} />
		</App>
	);
};

export default CheckApp;
