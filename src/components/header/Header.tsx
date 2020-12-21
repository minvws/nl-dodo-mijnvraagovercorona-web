/** @jsx jsx */
import * as React from 'react';

import { Box, jsx } from 'theme-ui';

type Props = {};

export const Header = (): Props => (
	<Box
		as="header"
		sx={{
			backgroundColor: 'dark-blue',
		}}
	>
		Header
	</Box>
);
