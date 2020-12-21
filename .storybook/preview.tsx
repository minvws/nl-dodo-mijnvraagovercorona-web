import { addDecorator } from '@storybook/react';

import { withNextRouter } from 'storybook-addon-next-router';

// import { Global } from '@emotion/core';
// import { ThemeProvider } from 'theme-ui';

// import { defaults, fonts, reset } from '../src/utilities/styling/global';
// import theme from '../src/utilities/styling/theme';

addDecorator(withNextRouter());

// addDecorator((storyFn) => (
// 	<ThemeProvider theme={theme}>
// 		<Global styles={reset} />
// 		<Global styles={fonts} />
// 		<Global styles={defaults} />
// 		{storyFn()}
// 	</ThemeProvider>
// ));
