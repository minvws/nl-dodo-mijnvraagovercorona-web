/** @jsx jsx */
import React from 'react';
import { jsx, Box, Styled } from 'theme-ui';
import {
	getFeedbackUrl,
	StyledLink,
	useSanitySiteSettings,
	useSanityPageContent,
} from '@quarantaine/common';
import type { PageContent } from 'pages/[locale]/index';

export const FeedbackPanel = () => {
	const siteSettings = useSanitySiteSettings();
	const page = useSanityPageContent<PageContent>();

	return (
		<Box
			sx={{
				flexDirection: 'column',
				display: 'flex',
				alignItems: 'center',
				padding: 14,
			}}
		>
			<img width="150px" src="/images/sanity/veelgestelde-vragen.svg" />
			<Styled.p
				sx={{
					fontSize: 24,
					fontWeight: 'bold',
					color: 'header',
					marginTop: 28,
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
		</Box>
	);
};
