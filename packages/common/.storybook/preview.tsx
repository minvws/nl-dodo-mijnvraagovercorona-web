/** @jsxRuntime classic /
/** @jsx jsx */
import { addDecorator } from '@storybook/react';
import { ThemeProvider, jsx } from 'theme-ui';
import { withNextRouter } from 'storybook-addon-next-router';
import { theme, TranslationProvider, locales } from '../src';

import '../src/theme/global.css';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';

addDecorator(withNextRouter());
addDecorator((storyFn) => (
	<ThemeProvider theme={theme}>
		<TranslationProvider
			locale={locales.dutch.id}
			locales={[locales.dutch, locales.english]}
			siteSettings={{}}
		>
			{storyFn()}
		</TranslationProvider>
	</ThemeProvider>
));
