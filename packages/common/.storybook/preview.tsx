/** @jsx jsx */
import { addDecorator } from '@storybook/react';
import { ThemeProvider, jsx } from 'theme-ui';
import { withNextRouter } from 'storybook-addon-next-router';
import { theme } from '../src/theme';

import '../src/theme/global.css';
import '@reach/menu-button/styles.css';
import '@reach/dialog/styles.css';

addDecorator(withNextRouter());
addDecorator((storyFn) => (
	<ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
));
