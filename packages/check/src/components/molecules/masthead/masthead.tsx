/** @jsx jsx */
import React from 'react';
import { Box, Container, Image, jsx, Styled } from 'theme-ui';
import {
	Retain,
	SanityImageFullProps,
	Stack,
	TheSwitcher,
	TheSwitcherItem,
} from '@quarantaine/common';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';
import { MastheadBase } from './masthead-base';

export interface MastheadProps {
	title: string | React.ReactNode;
	chapeau?: string | React.ReactNode;
	illustration?: SanityImageFullProps;
	headerSlot?: React.ReactNode;
}

export const Masthead: React.FC<MastheadProps> = ({
	headerSlot,
	title,
	chapeau,
	illustration,
	children,
}) => {
	return (
		<MastheadBase variant="default" headerSlot={headerSlot}>
			<TheSwitcher alignItems="center" gap={['2rem', '4rem']}>
				{illustration ? (
					<TheSwitcherItem>
						<Image
							src={illustration.src}
							alt=""
							sx={{
								maxInlineSize: ['17rem', , '100%'],
								marginInlineStart: 'auto',
								marginInlineEnd: 'auto',
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
						{chapeau && (
							<Styled.p
								sx={{
									fontSize: ['h2Mobile', 'h2'],
									lineHeight: ['h2Mobile', 'h2'],
									fontWeight: 'bold',
									color: 'highlight',
								}}
							>
								{chapeau}
							</Styled.p>
						)}
						<Styled.h1>{title}</Styled.h1>
						{children}
					</Stack>
				</Box>
			</TheSwitcher>
		</MastheadBase>
	);
};
