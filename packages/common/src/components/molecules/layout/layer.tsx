/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

interface OwnProps {
	backgroundColor?: string;
	pullUpBy?: string;
	paddingBlockStart?: string | string[];
	paddingBlockEnd?: string | string[];
	id?: string;
}

export const Layer: React.FC<OwnProps> = ({
	children,
	backgroundColor,
	pullUpBy,
	paddingBlockStart = '2.5rem',
	paddingBlockEnd = '2.5rem',
	id,
}) => {
	const calcPaddingBlockStart =
		typeof paddingBlockStart === 'object'
			? paddingBlockStart.map(
					(value) => `calc(${value} + ${pullUpBy || '0px'})`,
			  )
			: `calc(${paddingBlockStart} + ${pullUpBy || '0px'})`;

	return (
		<Box
			id={id}
			as="section"
			sx={{
				paddingBlockStart: calcPaddingBlockStart,
				paddingBlockEnd: paddingBlockEnd,
				marginBlockStart: pullUpBy ? [`-${pullUpBy}`] : 0,
				backgroundColor: backgroundColor ? backgroundColor : 'white',
			}}
		>
			{children}
		</Box>
	);
};
