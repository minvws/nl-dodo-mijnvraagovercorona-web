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

export interface MastheadProps {
	title: string | React.ReactNode;
	chapeau?: string | React.ReactNode;
	illustration?: string;
	headerSlot?: React.ReactNode;
}

export const Masthead: React.FC<MastheadProps> = ({
	headerSlot,
	title,
	chapeau,
	illustration = '/images/default-illustration.svg',
	children,
}) => {
	return (
		<Box
			sx={{
				background:
					'linear-gradient(179.97deg, #858DFF 44.27%, #6459E7 99.97%);',
				borderEndStartRadius: '2rem',
				borderEndEndRadius: '2rem',
				color: 'white',
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
					<TheSwitcher alignItems="center" gap={['2rem', '4rem']}>
						<TheSwitcherItem>
							<Image
								src={illustration}
								alt=""
								sx={{
									maxInlineSize: ['17rem', , '100%'],
									marginInlineStart: 'auto',
									marginInlineEnd: 'auto',
								}}
							/>
						</TheSwitcherItem>
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
				</Box>
			</Container>
		</Box>
	);
};
