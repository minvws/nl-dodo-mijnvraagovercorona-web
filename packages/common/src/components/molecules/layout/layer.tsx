/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

interface OwnProps {
	backgroundColor?: string;
	noPaddingBlockStart?: boolean;
	noPaddingBlockEnd?: boolean;
}

export const Layer: React.FC<OwnProps> = ({
	children,
	backgroundColor,
	noPaddingBlockStart,
	noPaddingBlockEnd,
}) => {
	return (
		<Box
			sx={{
				paddingBlockStart: noPaddingBlockStart ? 0 : ['40px'],
				paddingBlockEnd: noPaddingBlockEnd ? 0 : ['40px'],
				backgroundColor: backgroundColor ? backgroundColor : 'white',
			}}
		>
			{children}
		</Box>
	);
};
