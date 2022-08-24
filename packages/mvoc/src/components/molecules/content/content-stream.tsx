/** @jsx jsx */
import React from 'react';
import { jsx, Box, Image, Flex } from 'theme-ui';

import { ContentBlock, Stack } from '@quarantaine/common';

export interface ContentStreamProps {
	contentPrimary?: Object[];
	imagePrimary?: string;
	contentSecondary?: Object[];
	imageSecondary?: string;
}

export const ContentStream: React.FC<ContentStreamProps> = ({
	contentPrimary,
	imagePrimary,
	contentSecondary,
	imageSecondary,
}) => {
	const items = [];

	if (!contentPrimary && !imagePrimary && !contentSecondary && !imageSecondary)
		return null;

	if (contentPrimary && !imagePrimary && !contentSecondary && !imageSecondary)
		return (
			<Box sx={{ fontSize: ['bodyMobile', 'body'] }}>
				<ContentBlock content={contentPrimary} />
			</Box>
		);

	if (contentPrimary && imagePrimary)
		items.push({
			content: contentPrimary,
			image: imagePrimary,
		});

	if (contentSecondary && imageSecondary)
		items.push({
			content: contentSecondary,
			image: imageSecondary,
		});

	return (
		<Flex sx={{ justifyContent: 'space-evenly', gap: '1.25rem' }}>
			{items.map((item) => (
				<Stack key={item.image}>
					<Box sx={{ fontSize: ['bodyMobile', 'body'] }}>
						<ContentBlock content={item.content} />
					</Box>
					<Image
						src={item.image}
						sx={{
							display: 'block',
							maxInlineSize: '100%',
							marginInline: 'auto',
						}}
					/>
				</Stack>
			))}
		</Flex>
	);
};
