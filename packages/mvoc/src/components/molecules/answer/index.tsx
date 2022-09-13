/** @jsxRuntime classic /
/** @jsx jsx */
import { ContentBlock, Stack } from '@quarantaine/common';
import React from 'react';
import { jsx, Styled, Box } from 'theme-ui';

export type AnswerProps = {
	title: string;
	content: Object[];
};

export const Answer: React.FC<AnswerProps> = ({ title, content }) => (
	<Box
		as="section"
		id="antwoord"
		sx={{
			backgroundColor: 'headerBackground',
			color: 'header',
			borderRadius: 'box',
			padding: '1.5rem',
		}}
	>
		<Stack spacing={['1rem']}>
			<Styled.h2>{title}</Styled.h2>
			<ContentBlock content={content} />
		</Stack>
	</Box>
);
