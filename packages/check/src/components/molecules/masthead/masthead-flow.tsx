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

export interface MastheadFlowProps {
	title: string | React.ReactNode;
	illustration?: SanityImageFullProps;
	prefixSlot?: React.ReactNode;
	headerSlot?: React.ReactNode;
	noIllustrationMobile?: boolean;
}

export const mastheadMobileImageBlockSize = '10rem'; /* 160px */

export const MastheadFlow: React.FC<MastheadFlowProps> = ({
	title,
	illustration,
	children,
	headerSlot,
	prefixSlot,
	noIllustrationMobile,
}) => {
	const hasIllustration = !!(illustration && illustration.src);
	return (
		<MastheadBase variant="default" headerSlot={headerSlot}>
			<TheSwitcher
				alignItems="end"
				gap={['2rem', '4rem']}
				minBlockSize={['0', '11rem']}
			>
				{hasIllustration ? (
					<TheSwitcherItem
						styles={{
							display: noIllustrationMobile ? ['none', 'flex'] : 'flex',
						}}
					>
						<Image
							src={illustration?.src}
							alt=""
							sx={{
								blockSize: [mastheadMobileImageBlockSize, '14rem'],
								maxInlineSize: ['17rem', '100%'],
								marginInlineStart: 'auto',
								marginInlineEnd: 'auto',
								objectFit: 'contain',
								marginBlockEnd: [
									illustration
										? `calc(${mastheadMobileImageBlockSize} * -1)`
										: 'auto',
									'auto',
								],
							}}
						/>
					</TheSwitcherItem>
				) : null}
				<Box
					sx={{
						textAlign: ['center', 'start'],
						paddingBlockStart: ['1.25rem', '0'],
						order: [-1],
						maxInlineSize: hasIllustration ? '100%' : ['100%', '50%'],
					}}
				>
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
