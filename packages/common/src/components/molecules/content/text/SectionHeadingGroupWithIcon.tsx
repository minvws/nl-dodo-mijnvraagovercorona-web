/** @jsx jsx */
import React from 'react';
import { Box, Flex, Image, jsx } from 'theme-ui';
import { SectionHeadingGroup } from '@quarantaine/common';

type OwnProps = {
	title: string;
	icon?: string;
};

export const SectionHeadingGroupWithIcon: React.FC<OwnProps> = ({
	children,
	title,
	icon,
}) => (
	<Flex
		sx={{
			alignItems: 'start',
			gap: '2rem',
		}}
	>
		{icon ? (
			<Image
				src={icon}
				alt=""
				sx={{
					inlineSize: '2.25rem',
				}}
			/>
		) : null}
		<Box
			sx={{
				flex: 'auto',
			}}
		>
			<SectionHeadingGroup title={title} align="start">
				{children}
			</SectionHeadingGroup>
		</Box>
	</Flex>
);
