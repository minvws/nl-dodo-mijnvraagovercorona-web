/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, jsx } from 'theme-ui';

interface OwnProps {
	asideChildren?: React.ReactNode;
	split?: boolean;
}

export const TheThirds: React.FC<OwnProps> = ({
	children,
	asideChildren,
	split,
}) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: ['1fr', '1fr 1fr 1fr 1fr 1fr 1fr'],
				gap: ['2rem', '4rem'],
			}}
		>
			<Box
				sx={{
					gridColumnStart: ['1'],
					gridColumnEnd: [-1, split ? 4 : 3],
				}}
			>
				{asideChildren}
			</Box>
			<Box
				sx={{
					gridColumnStart: ['1', split ? 4 : 3],
					gridColumnEnd: '-1',
				}}
			>
				{children}
			</Box>
		</Box>
	);
};
