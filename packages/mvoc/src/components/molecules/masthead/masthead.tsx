/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { Box, Image, jsx, Themed } from 'theme-ui';
import {
	SanityImageFullProps,
	Retain,
	Stack,
	TheSwitcher,
	TheSwitcherItem,
} from '@quarantaine/common';
import { MastheadBase } from './masthead-base';

export interface MastheadProps {
	title: string | React.ReactNode;
	prefixSlot?: React.ReactNode;
	illustration?: SanityImageFullProps;
	variant?: 'default' | 'highlight';
}

export const Masthead: React.FC<MastheadProps> = ({
	title,
	prefixSlot,
	illustration,
	variant,
	children,
}) => {
	return (
		<MastheadBase variant={variant}>
			<TheSwitcher alignItems="center" gap={['2rem', '4rem']}>
				{illustration && illustration.src ? (
					<TheSwitcherItem>
						<Image
							src={illustration.src}
							alt=""
							sx={{
								blockSize: [
									variant === 'highlight' ? '15rem' : '10rem',
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
					<Retain>
						<Stack spacing={['1rem']}>
							{prefixSlot ? prefixSlot : null}
							<Themed.h1>{title}</Themed.h1>
							{children}
						</Stack>
					</Retain>
				</Box>
			</TheSwitcher>
		</MastheadBase>
	);
};
