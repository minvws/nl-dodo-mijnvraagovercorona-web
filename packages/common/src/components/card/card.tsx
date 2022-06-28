/** @jsx jsx */
import React from 'react';
import { jsx, Styled, Box, Text } from 'theme-ui';

import { ContentBlock, StyledLink } from '@quarantaine/common';
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
			{chapeau && (
				<Text variant="chapeau" as="p" sx={{ marginBlockStart: 0 }}>
					{chapeau}
				</Text>
			)}
			<Styled.h2>{title}</Styled.h2>

			<ContentBlock content={content} />

			{!!buttons?.length &&
				buttons.map(({ text, link, situation }) => (
					<StyledLink
						styledAs="button"
						href={link || `/${situation}`}
						key={text}
						external={!!link}
					>
						{text}
					</StyledLink>
				))}
		</Box>
	);
};
