/** @jsx jsx */
import React from 'react';
import { jsx, Box, Styled } from 'theme-ui';
import {
	getFeedbackUrl,
	StyledLink,
	useSanitySiteSettings,
	useSanityPageContent,
	Stack,
} from '@quarantaine/common';
import type { PageContent } from 'pages/[locale]/index';

export const FeedbackPanel = () => {
	const siteSettings = useSanitySiteSettings();
	const page = useSanityPageContent<PageContent>();

	return (
		<Stack
			styles={{
				display: 'flex',
				maxInlineSize: '17.5rem',
				marginInlineStart: 'auto',
				marginInlineEnd: 'auto',
				flexDirection: 'column',
				alignItems: 'center',
				textAlign: 'center',
			}}
		>
			<img width="150px" src="/images/questions.svg" alt="" />
			<Styled.p
				sx={{
					fontSize: ['h2Mobile', 'h2'],
					fontWeight: 'bold',
					color: 'header',
				}}
			>
				{page.feedback.title}
			</Styled.p>
			<StyledLink
				styledAs="button"
				external
				href={getFeedbackUrl(siteSettings.feedback.url, {
					source: 'home',
				})}
			>
				{page.feedback.button}
			</StyledLink>
		</Stack>
	);
};
