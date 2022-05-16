/** @jsx jsx */
import React from 'react';
import { jsx, Box, Image, Flex } from 'theme-ui';

import { ContentBlock, Stack } from '@quarantaine/common';

export interface DualImageProps {
	contentLeft?: Object[];
	imageLeft?: string;
	contentRight?: Object[];
	imageRight?: string;
}

export const DualImage: React.FC<DualImageProps> = ({
	contentLeft,
	imageLeft,
	contentRight,
	imageRight,
}) => {
	const items = [];

	if (contentLeft && imageLeft)
		items.push({
			content: contentLeft,
			image: imageLeft,
		});

	if (contentRight && imageRight)
		items.push({
			content: contentRight,
			image: imageRight,
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
