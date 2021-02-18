/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

type PanelProps = {
	children: React.ReactNode;
};

export const Panel = (props: PanelProps) => (
	<Box
		sx={{
			borderRadius: '5px',
			boxShadow: '1px 1px 3px 3px #eee',
			margin: 'componentSpacing',
			paddingLeft: '1.5em',
			paddingTop: '0.2em',
		}}
	>
		{props.children}
	</Box>
);
