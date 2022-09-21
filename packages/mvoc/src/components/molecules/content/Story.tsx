/** @jsxImportSource theme-ui */
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
			id={
				title
					? slugify(title, {
							strict: true,
							lower: true,
					  })
					: null
			}
		>
			<Stack spacing={['1rem']}>
				{title ? <Themed.h2>{title}</Themed.h2> : null}
				{contentBlocks && <MultiContentBlock contentBlocks={contentBlocks} />}
			</Stack>
		</Box>
	);
};
