/** @jsx jsx */
import { addDecorator } from '@storybook/react';
import { ThemeProvider, jsx } from 'theme-ui';
import { withNextRouter } from 'storybook-addon-next-router';
import { theme } from '../src/theme';
import '../src/theme/fonts.css';

addDecorator(withNextRouter());
addDecorator((storyFn) => (
	<ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
));
