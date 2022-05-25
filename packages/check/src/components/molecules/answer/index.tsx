/** @jsx jsx */
import { ContentBlock } from '@quarantaine/common';
import React from 'react';
import { jsx, Styled, Box } from 'theme-ui';

export type AnswerProps = {
	title: string;
	content: Object[];
};

export const Answer: React.FC<AnswerProps> = ({ title, content }) => (
	<Box
		sx={{
			backgroundColor: 'headerBackground',
			color: 'header',
			borderRadius: '11px',
			padding: '24px',
		}}
	>
		<Styled.h2>{title}</Styled.h2>
		<ContentBlock content={content} />
	</Box>
);
