/** @jsxRuntime classic /
/** @jsx jsx */
import React, { ElementType } from 'react';
import { Box, jsx, SxStyleProp } from 'theme-ui';

interface OwnProps {
	as?: ElementType;
	gap?: string | string[];
	minItemSize?: string;
	placement?: 'auto-fill' | 'auto-fit';
	styles?: SxStyleProp;
}

export const TheGrid: React.FC<OwnProps> = ({
	as = 'div',
	minItemSize,
	placement = 'auto-fill',
	gap = ['2.25rem'],
	styles,
	children,
}) => {
	return (
		<Box
			as={as}
			role={as === 'ul' || as === 'ol' ? 'list' : undefined}
			sx={{
				...styles,
				display: 'grid',
				gridTemplateColumns: `repeat(
					${placement},
					minmax(min(${minItemSize || '16rem'}, 100%), 1fr)
				)`,
				gap: gap,
				// Reset possible list styles
				listStyle: 'none',
				paddingInlineStart: 0,
			}}
		>
			{children}
		</Box>
	);
};
