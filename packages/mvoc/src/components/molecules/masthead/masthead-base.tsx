/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { Box, Container, jsx } from 'theme-ui';
import { theme } from '@quarantaine/common';

export interface MastheadProps {
	variant?: 'default' | 'highlight';
}

export const MastheadBase: React.FC<MastheadProps> = ({
	variant = 'default',
	children,
}) => {
	return (
		<Box
			sx={{
				position: 'relative',
				...(variant === 'highlight'
					? {
							backgroundColor: 'headerBackgroundHighlight',
							borderEndStartRadius: '2rem',
							borderEndEndRadius: '2rem',
							color: 'header',
					  }
					: {
							backgroundColor: 'headerBackground',
							color: 'header',
					  }),
			}}
		>
			<Container
				sx={{
					paddingBlockStart: [variant === 'highlight' ? 0 : '1.5rem'],
				}}
			>
				<Box
					sx={{
						paddingBlockEnd: ['2rem', '3.5rem'],
						paddingX: ['mobilePadding', 'tabletPadding', 0],
					}}
				>
					{children}
				</Box>
			</Container>
		</Box>
	);
};
