/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import slugify from 'slugify';
import { SanityImageFullProps, Stack } from '@quarantaine/common';
import { Box, jsx, Themed } from 'theme-ui';
import { MultiContentBlock, MultiContentBlockProps } from './MultiContentBlock';

export interface StoryProps {
	title: string;
	contentBlocks: MultiContentBlockProps[];
	overview: {
		title: string;
		icon: SanityImageFullProps;
	};
}

export const Story: React.FC<StoryProps> = ({ title, contentBlocks }) => {
	return (
		<Box
			as="section"
			id={slugify(title, {
				strict: true,
				lower: true,
			})}
		>
			<Stack spacing={['1rem']}>
				<Themed.h2>{title}</Themed.h2>
				{contentBlocks && <MultiContentBlock contentBlocks={contentBlocks} />}
			</Stack>
		</Box>
	);
};
