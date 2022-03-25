/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

interface OwnProps {
	asideChildren?: React.ReactNode;
}

export const TheThirds: React.FC<OwnProps> = ({ children, asideChildren }) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: ['1fr', '1fr 1fr 1fr'],
				gap: ['2rem', '4rem'],
			}}
		>
			<Box>{asideChildren}</Box>
			<Box
				sx={{
					gridColumnStart: ['1', '2'],
					gridColumnEnd: '-1',
				}}
			>
				{children}
			</Box>
		</Box>
	);
};
