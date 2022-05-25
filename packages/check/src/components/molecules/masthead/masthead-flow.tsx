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
	illustration?: {
		src: string;
		dimensions: {
			aspectRatio: number;
			width: number;
			height: number;
		};
	};
	prefixSlot?: React.ReactNode;
	headerSlot?: React.ReactNode;
}

const mastheadMobileMaxSize = 272; /* 17rem */

export const calculateFlowImageMargin = ({
	width,
	height,
}: {
	width: number;
	height: number;
}) => {
	if (!width && !height)
		return '12rem'; /* safe value when dimensions are not known */

	// Check which width we need to calculate with, the max size or the width of
	// the image
	const widthToCalcWith =
		mastheadMobileMaxSize <= width ? mastheadMobileMaxSize : width;

	// Return a calculation based off the width and the ratio
	return `calc(${widthToCalcWith / 16}rem * ${height / width})`;
};

export const MastheadFlow: React.FC<MastheadFlowProps> = ({
	title,
	illustration,
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
									src={illustration.src}
									alt=""
									sx={{
										maxInlineSize: [
											`${mastheadMobileMaxSize / 16}rem`,
											,
											'100%',
										],
										marginInlineStart: 'auto',
										marginInlineEnd: 'auto',
										marginBlockEnd: [
											illustration
												? `calc(${calculateFlowImageMargin({
														...illustration.dimensions,
												  })} * -1)`
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
