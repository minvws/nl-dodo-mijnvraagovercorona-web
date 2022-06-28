/** @jsx jsx */
import React from 'react';
import { jsx, Styled, Box, Text, Flex } from 'theme-ui';

import { ContentBlock, StyledLink, Stack } from '@quarantaine/common';
import slugify from 'slugify';
interface CardProps {
	title: string;
	chapeau: string;
	content: Object[];
	buttons: {
		link?: string;
		situation?: string;
		text: string;
	}[];
}

export const Card: React.FC<CardProps> = ({
	title,
	chapeau,
	content,
	buttons,
}) => {
	return (
		<Box
			id={
				title &&
				slugify(title, {
					strict: true,
					lower: true,
				})
			}
			sx={{
				position: 'relative',
				padding: 'box',
				borderRadius: 'box',
				border: 'card',
				fontSize: ['bodyMobile', 'body'],
				backgroundColor: 'white',

				'*:last-child': {
					marginBlockEnd: 0,
				},
			}}
		>
			<Stack spacing={['1rem']}>
				<Stack spacing={['0.5rem']}>
					{chapeau && (
						<Text variant="chapeau" as="p" sx={{ marginBlockStart: 0 }}>
							{chapeau}
						</Text>
					)}
					<Styled.h3
						sx={{
							fontSize: ['h2Mobile', 'h2'],
							lineHeight: ['h2Mobile', 'h2'],
						}}
					>
						{title}
					</Styled.h3>
				</Stack>

				<ContentBlock content={content} />

				{!!buttons?.length ? (
					<Flex
						as="ul"
						sx={{
							flexDirection: 'column',
							gap: ['1rem'],
							listStyle: 'none',
							paddingInlineStart: 0,
						}}
					>
						{buttons.map(({ text, link, situation }) => (
							<li key={text}>
								<StyledLink
									styledAs="button"
									href={link || `/${situation}`}
									external={!!link}
								>
									{text}
								</StyledLink>
							</li>
						))}
					</Flex>
				) : null}
			</Stack>
		</Box>
	);
};
