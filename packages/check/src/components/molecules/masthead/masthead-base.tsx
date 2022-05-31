/** @jsx jsx */
import React from 'react';
import { Box, Container, jsx } from 'theme-ui';
import { theme } from '@quarantaine/common';

export interface MastheadProps {
	variant?: 'default' | 'highlight';
	headerSlot?: React.ReactNode;
}

export const MastheadBase: React.FC<MastheadProps> = ({
	variant = 'default',
	headerSlot,
	children,
}) => {
	return (
		<Box
			sx={{
				position: 'relative',
				...(variant === 'highlight'
					? {
							background:
								'linear-gradient(179.97deg, #858DFF 44.27%, #6459E7 99.97%)',
							borderEndStartRadius: '2rem',
							borderEndEndRadius: '2rem',
							color: 'white',
					  }
					: {
							// weird hack to get the background from theme, 'headerBackground' doesnt work here.
							background: theme?.colors?.headerBackground,
							color: 'header',
					  }),
			}}
		>
			{headerSlot}
			<Container>
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
