/** @jsx jsx */
import React from 'react';
import { Box, Image, jsx, Styled } from 'theme-ui';
import {
	SanityImageFullProps,
	Stack,
	TheSwitcher,
	TheSwitcherItem,
} from '@quarantaine/common';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';
import { MastheadBase } from './masthead-base';

export interface MastheadProps {
	title: string | React.ReactNode;
	prefixSlot?: React.ReactNode;
	illustration?: SanityImageFullProps;
	headerSlot?: React.ReactNode;
	variant?: 'default' | 'highlight';
}

export const Masthead: React.FC<MastheadProps> = ({
	title,
	prefixSlot,
	illustration,
	headerSlot,
	variant,
	children,
}) => {
	return (
		<MastheadBase variant={variant} headerSlot={headerSlot}>
			<TheSwitcher alignItems="center" gap={['2rem', '4rem']}>
				{illustration ? (
					<TheSwitcherItem>
						<Image
							src={illustration.src}
							alt=""
							sx={{
								blockSize: [
									'10rem',
									variant === 'highlight' ? '25rem' : '14rem',
								],
								maxInlineSize: ['17rem', '100%'],
								marginInlineStart: 'auto',
								marginInlineEnd: 'auto',
								objectFit: 'contain',
							}}
						/>
					</TheSwitcherItem>
				) : null}
				<Box sx={{ order: [, -1] }}>
					<Stack
						spacing={['1rem']}
						styles={{
							maxInlineSize: [retainMaxWidth],
							marginInlineStart: 'auto',
							marginInlineEnd: 'auto',
						}}
					>
						{prefixSlot ? prefixSlot : null}
						<Styled.h1>{title}</Styled.h1>
						{children}
					</Stack>
				</Box>
			</TheSwitcher>
		</MastheadBase>
	);
};
