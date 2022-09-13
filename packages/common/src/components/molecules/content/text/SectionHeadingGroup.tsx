/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { Styled, jsx } from 'theme-ui';
import { Stack } from '@quarantaine/common';

type OwnProps = {
	title: string;
	maxInlineSize?: string | string[];
	align?: 'start' | 'center';
};

export const SectionHeadingGroup: React.FC<OwnProps> = ({
	children,
	title,
	maxInlineSize,
	align = 'start',
}) => (
	<Stack
		spacing={'0.5rem'}
		styles={{
			textAlign: align === 'start' ? 'start' : ['start', 'center'],
			maxInlineSize: maxInlineSize || 'maxInlineSizeText',
			marginInline: align === 'start' ? 0 : 'auto',
			'> p': {
				color: 'copyHeading',
			},
		}}
	>
		<Styled.h2
			sx={{
				fontSize: ['h1Mobile', 'h1'],
				lineHeight: ['h1Mobile', 'h1'],
			}}
		>
			{title}
		</Styled.h2>
		{children}
	</Stack>
);
