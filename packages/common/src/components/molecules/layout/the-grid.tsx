/** @jsx jsx */
import React from 'react';
import { Box, jsx, SxStyleProp } from 'theme-ui';

interface OwnProps {
	gap?: string | string[];
	minItemSize?: string;
	placement?: 'auto-fill' | 'auto-fit';
}

export const TheGrid: React.FC<OwnProps> = ({
	minItemSize,
	placement = 'auto-fill',
	gap = ['2.25rem'],
	children,
}) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: `repeat(
					${placement},
					minmax(${minItemSize || '16rem'}, 1fr)
				)`,
				gap: gap,
			}}
		>
			{children}
		</Box>
	);
};
