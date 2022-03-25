/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

interface OwnProps {
	backgroundColor?: string;
	noPaddingBlockStart?: boolean;
	noPaddingBlockEnd?: boolean;
	pullUpBy?: string;
}

export const Layer: React.FC<OwnProps> = ({
	children,
	backgroundColor,
	noPaddingBlockStart,
	noPaddingBlockEnd,
	pullUpBy,
}) => {
	return (
		<Box
			sx={{
				paddingBlockStart: noPaddingBlockStart
					? 0
					: [`calc(2.5rem + ${pullUpBy || '0px'})`],
				paddingBlockEnd: noPaddingBlockEnd ? 0 : ['2.5rem'],
				marginBlockStart: pullUpBy ? [`-${pullUpBy}`] : 0,
				backgroundColor: backgroundColor ? backgroundColor : 'white',
			}}
		>
			{children}
		</Box>
	);
};
