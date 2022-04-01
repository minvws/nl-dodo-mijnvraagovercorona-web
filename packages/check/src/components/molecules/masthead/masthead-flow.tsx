/** @jsx jsx */
import React from 'react';
import { Box, Container, Image, jsx, Styled } from 'theme-ui';
import {
	Retain,
	Stack,
	TheSwitcher,
	TheSwitcherItem,
} from '@quarantaine/common';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';

export interface MastheadFlowProps {
	title: string | React.ReactNode;
	illustration?: string | null;
	prefixSlot?: React.ReactNode;
	headerSlot?: React.ReactNode;
}

export const mastheadFlowImageMargin = '12rem';

export const MastheadFlow: React.FC<MastheadFlowProps> = ({
	title,
	illustration = '/images/default-illustration.svg',
	children,
	headerSlot,
	prefixSlot,
}) => {
	return (
		<Box
			sx={{
				position: 'relative',
				backgroundColor: 'headerBackground',
				color: 'header',
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
					<TheSwitcher
						alignItems="end"
						gap={['2rem', '4rem']}
						minBlockSize={['0', '11rem']}
					>
						{illustration ? (
							<TheSwitcherItem>
								<Image
									src={illustration}
									alt=""
									sx={{
										maxInlineSize: ['17rem', , '100%'],
										marginInlineStart: 'auto',
										marginInlineEnd: 'auto',
										marginBlockEnd: [`-${mastheadFlowImageMargin}`, 'auto'],
									}}
								/>
							</TheSwitcherItem>
						) : null}
						<Box
							sx={{
								textAlign: ['center', 'start'],
								paddingBlockStart: ['1.25rem', '0'],
								order: [-1],
								maxInlineSize: illustration ? '100%' : ['100%', '50%'],
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
				</Box>
			</Container>
		</Box>
	);
};
