/** @jsx jsx */
import React from 'react';
import { Box, jsx, Styled } from 'theme-ui';

import { Page } from 'components/page';

import {
	ExpansionPanel,
	Link,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	Content,
	MetaTags,
	ContentBlock,
	useSanityPageContent,
	Feedback,
	getFeedbackUrl,
	Hero,
	useSanitySiteSettings,
	trackEvent,
	Locales,
} from '@quarantaine/common';
import { LinkBack } from 'components/link-back';
import { locales } from 'content/general-content';
import { ExpansionPanelVariant } from '@quarantaine/common/src/components/expansion-panel/expansion-panel';
import {
	ContentSituationBlock,
	ContentSituationBlockProps,
} from 'components/molecules';

export interface SituationContent {
	title: string;
	titleSuffix?: string;
	content: Array<Object>;
	contentBlocks: ContentSituationBlockProps[];
}

export interface JouwSituatiePageNoMatchContent {
	noMatch: {
		title: string;
		button: string;
		content: Array<Object>;
	};
}

export interface JouwSituatiePageSituationsContent
	extends JouwSituatiePageNoMatchContent {
	situationsYouTitle: string;
	situationsYou: SituationContent[];
	situationsOtherTitle: string;
	situationsOther: SituationContent[];
	situationsExceptionsTitle: string;
	situationsExceptionsContent: Array<Object>;
	situationsExceptions: SituationContent[];
}

export interface JouwSituatiePageContent
	extends JouwSituatiePageSituationsContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		content: Object[];
	};
	url: string;
	currentStepLabel: string;
}

export const renderPanel = (
	situation: SituationContent,
	variant: ExpansionPanelVariant = 'plus',
	deepLinkAble?: boolean,
) => (
	<ExpansionPanel
		key={situation.title}
		title={situation.title}
		titleSuffix={situation.titleSuffix}
		toggleEvent={(state: string) =>
			state === 'open' && trackEvent('Situation', 'Open', situation.title)
		}
		variant={variant}
		deepLinkAble={deepLinkAble}
	>
		<ContentSituationBlock contentBlocks={situation.contentBlocks} />
	</ExpansionPanel>
);

export default function JouwSituatie({ locale }: { locale: string }) {
	const page = useSanityPageContent<JouwSituatiePageContent>();
	const siteSettings = useSanitySiteSettings();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
			/>
			<Page>
				<Hero title={page.header.title}>
					<LinkBack href={`/${locale}`} />
				</Hero>
				<Content>
					<Box sx={{ mt: '36px' }}>
						<Styled.h2>{page.situationsYouTitle}</Styled.h2>
						{page.situationsYou.map((situation) =>
							renderPanel(situation, 'plus', true),
						)}
					</Box>
					<Box sx={{ my: '36px' }}>
						<Styled.h2>{page.situationsOtherTitle}</Styled.h2>

						{page.situationsOther.map((situation) =>
							renderPanel(situation, 'plus', true),
						)}
					</Box>

					<Styled.h2>{page.noMatch.title}</Styled.h2>
					<ContentBlock content={page.noMatch.content} />

					<Feedback
						name="Your Situation"
						feedbackUrl={getFeedbackUrl(siteSettings.feedback.url, {
							source: 'your-situation',
						})}
					/>
				</Content>
			</Page>
		</>
	);
}

interface JouwSituatieStaticProps {
	params: { locale: Locales };
}

export const getJouwSituatiePageNoMatchProjection = (locale: string) => `
	"noMatch": {
		${getLocaleProperty({ name: 'title', path: 'noMatch.title', locale })},
		${getLocaleProperty({ name: 'button', path: 'noMatch.button', locale })},
		${getLocaleProperty({
			name: 'content',
			path: 'noMatch.content',
			locale,
			block: true,
		})},
	}
`;

export const getJouwSituatiePageSituationsProjection = (locale: string) => `
	${getLocaleProperty({ name: 'situationsYouTitle', locale })},
	"situationsYou": situationsYou[]{
		${getLocaleProperty({ name: 'title', locale })},
		${getLocaleProperty({
			name: 'titleSuffix',
			locale,
		})},
		${getLocaleProperty({
			name: 'content',
			locale,
			block: true,
		})},
		"contentBlocks": contentBlocks[]{
			${getLocaleProperty({
				name: 'content',
				path: '@',
				locale,
				block: true,
			})},
			"situation": {
				${getLocaleProperty({
					name: 'situationLinkTitle',
					locale,
				})},
				"url": situationReference->url,
				"showDate": situationReference->showDate,
				"showExceptions": situationReference->showExceptions,
			}
		}
	},
	${getLocaleProperty({ name: 'situationsOtherTitle', locale })},
	"situationsOther": situationsOther[]{
		${getLocaleProperty({ name: 'title', locale })},
		${getLocaleProperty({
			name: 'titleSuffix',
			locale,
		})},
		${getLocaleProperty({
			name: 'content',
			locale,
			block: true,
		})},
		"contentBlocks": contentBlocks[]{
			${getLocaleProperty({
				name: 'content',
				path: '@',
				locale,
				block: true,
			})},
			"situation": {
				${getLocaleProperty({
					name: 'situationLinkTitle',
					locale,
				})},
				"url": situationReference->url,
				"showDate": situationReference->showDate,
				"showExceptions": situationReference->showExceptions,
			}
		}
	},
	${getLocaleProperty({ name: 'situationsExceptionsTitle', locale })},
	${getLocaleProperty({
		name: 'situationsExceptionsContent',
		locale,
		block: true,
	})},
	"situationsExceptions": situationsExceptions[]{
		${getLocaleProperty({ name: 'title', locale })},
		${getLocaleProperty({
			name: 'titleSuffix',
			locale,
		})},
		${getLocaleProperty({
			name: 'content',
			locale,
			block: true,
		})},
		"contentBlocks": contentBlocks[]{
			${getLocaleProperty({
				name: 'content',
				path: '@',
				locale,
				block: true,
			})},
			"situation": {
				${getLocaleProperty({
					name: 'situationLinkTitle',
					locale,
				})},
				"url": situationReference->url,
				"showDate": situationReference->showDate,
				"showExceptions": situationReference->showExceptions,
			}
		}
	}
`;

export const getStaticProps = async ({
	params: { locale },
}: JouwSituatieStaticProps) => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
			${getLocaleProperty({
				name: 'content',
				path: 'header.content',
				locale,
				block: true,
			})},
		},
		${getJouwSituatiePageSituationsProjection(locale)},
		${getJouwSituatiePageNoMatchProjection(locale)},
		url,
		${getLocaleProperty({ name: 'currentStepLabel', locale })},
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'jouw-situatie-page',
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			locale,
		},
	};
};

export const getStaticPaths = () => ({
	paths: locales.map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});
