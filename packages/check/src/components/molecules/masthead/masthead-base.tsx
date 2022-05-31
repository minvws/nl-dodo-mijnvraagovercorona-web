/** @jsx jsx */
import React from 'react';
import { Box, Container, Image, jsx, Styled } from 'theme-ui';
import {
	Retain,
	Stack,
	theme,
	TheSwitcher,
	TheSwitcherItem,
} from '@quarantaine/common';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';

export interface MastheadProps {
	variant?: 'default' | 'highlight';
	headerSlot?: React.ReactNode;
	// title: string | React.ReactNode;
	// chapeau?: string | React.ReactNode;
	// illustration?: string;
}

export const MastheadBase: React.FC<MastheadProps> = ({
	variant = 'default',
	headerSlot,
	// title,
	// chapeau,
	// illustration = '/images/default-illustration.svg',
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
