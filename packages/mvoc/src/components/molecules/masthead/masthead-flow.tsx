/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { Box, jsx, Themed } from 'theme-ui';
import { Stack, Retain } from '@quarantaine/common';
import { MastheadBase } from './masthead-base';

export interface MastheadFlowProps {
	title: string | React.ReactNode;
	prefixSlot?: React.ReactNode;
}

export const MastheadFlow: React.FC<MastheadFlowProps> = ({
	title,
	children,
	prefixSlot,
}) => {
	return (
		<MastheadBase variant="default">
			<Box
				sx={{
					textAlign: ['center', 'start'],
					paddingBlockStart: ['1.25rem', '1.5rem'],
					maxInlineSize: '100%',
				}}
			>
				<Retain>
					<Stack spacing={['1rem']}>
						{prefixSlot ? prefixSlot : null}
						<Themed.h1
							sx={{
								fontSize: ['h2Mobile', 'h2'],
								lineHeight: ['h2Mobile', 'h2'],
							}}
						>
							{title}
						</Themed.h1>
						{children}
					</Stack>
				</Retain>
			</Box>
		</MastheadBase>
	);
};
