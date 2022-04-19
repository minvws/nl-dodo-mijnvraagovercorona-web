/** @jsx jsx */
import React from 'react';
import { Text, Styled, jsx, Box } from 'theme-ui';
import {
	Stack,
	Retain,
	TheSwitcher,
	TheSwitcherItem,
} from '@quarantaine/common';
import slugify from 'slugify';

type StoryProps = {
	chapeau: string;
	title: string;
	media: React.ReactNode;
	mediaAlignment?: 'start' | 'end';
	id?: string;
};

export const Story: React.FC<StoryProps> = ({
	id,
	mediaAlignment = 'end',
	media,
	chapeau,
	title,
	children,
}) => (
	<Box
		id={id ? id : slugify(title, { lower: true, strict: true })}
		as="section"
	>
		<TheSwitcher gap={['2rem', '8rem']} alignItems="center">
			<TheSwitcherItem>{media}</TheSwitcherItem>
			<Box
				sx={{
					order: [, mediaAlignment === 'end' ? -1 : null],
				}}
			>
				<Retain>
					<Stack spacing={['1rem', '2rem']}>
						{chapeau && (
							<Text variant="chapeau" sx={{ marginBlockStart: 0 }}>
								{chapeau}
							</Text>
						)}
						<Styled.h2>{title}</Styled.h2>
						<Stack>{children}</Stack>
					</Stack>
				</Retain>
			</Box>
		</TheSwitcher>
	</Box>
);
