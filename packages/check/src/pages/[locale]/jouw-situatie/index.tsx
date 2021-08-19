/** @jsx jsx */
import React from 'react';
import { Box, jsx, Styled } from 'theme-ui';

import { Page } from 'components/page';
import { ProgressMarker } from 'components/progress-marker';

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
	useSanitySiteSettings,
	Hero,
} from '@quarantaine/common';
import { Situation } from 'config/situaties';
import { Locale } from 'types/locale';
import { LinkBack } from 'components/link-back';

interface SituationContent {
	title: string;
	titleSuffix?: string;
	content: Array<Object>;
	contentBlocks: Array<Object>;
}

interface JouwSituatiePageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	situationsYouTitle: string;
	situationsYou: SituationContent[];
	situationsOtherTitle: string;
	situationsOther: SituationContent[];
	situationsExceptionsTitle: string;
	situationsExceptions: SituationContent[];
	noMatch: {
		title: string;
		content: Array<Object>;
	};
	url: string;
	currentStepLabel: string;
}

interface SituationAsLink extends Situation {
	situationLinkTitle: string;
}

interface ContentBlocks {
	content?: Array<Object>;
	situation?: SituationAsLink;
}

const getUrlBySituation = (situation: Situation) => {
	if (
		typeof situation.showProtected !== 'undefined' &&
		situation.showProtected
	) {
		return `/${situation.url}/ben-ik-beschermd`;
	} else if (typeof situation.showDate !== 'undefined' && situation.showDate) {
		return `/${situation.url}/wanneer`;
	}
	return `/${situation.url}`;
};

const renderPanel = (situation: SituationContent) => (
	<ExpansionPanel
		key={situation.title}
		title={situation.title}
		titleSuffix={situation.titleSuffix}
		variant="plus"
	>
		{situation.contentBlocks &&
			situation.contentBlocks.map(
				(contentBlock: ContentBlocks, key: number) => {
					if (contentBlock.content) {
						return <ContentBlock key={key} content={contentBlock.content} />;
					} else if (contentBlock.situation?.url) {
						return (
							<Styled.p key={key}>
								<Link
									styledAs="button"
									href={getUrlBySituation(contentBlock.situation)}
									sx={{
										marginBottom: '8px',
										marginTop: '8px',
									}}
								>
									{contentBlock.situation.situationLinkTitle}
								</Link>
							</Styled.p>
						);
					}
				},
			)}
	</ExpansionPanel>
);

export default function JouwSituatie({ locale }: { locale: string }) {
	const page = useSanityPageContent<JouwSituatiePageContent>();
	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
			/>
			<Page>
				<Hero title={page.header.title}>
					<LinkBack href={`/${locale}/`} />
				</Hero>
				<Content>
					<Box sx={{ mt: '36px' }}>
						<Styled.h2>{page.situationsYouTitle}</Styled.h2>
						{page.situationsYou.map((situation) => renderPanel(situation))}
					</Box>
					<Box sx={{ my: '36px' }}>
						<Styled.h2>{page.situationsOtherTitle}</Styled.h2>

						{page.situationsOther.map((situation) => renderPanel(situation))}
					</Box>
					<Box sx={{ my: '36px' }}>
						<Styled.h2>{page.situationsExceptionsTitle}</Styled.h2>

						{page.situationsExceptions.map((situation) =>
							renderPanel(situation),
						)}
					</Box>

					<Styled.h2>{page.noMatch.title}</Styled.h2>
					<ContentBlock content={page.noMatch.content} />
				</Content>
			</Page>
		</>
	);
}

interface JouwSituatieStaticProps {
	params: { locale: Locale };
}

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
		},
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
			})},
      "contentBlocks": contentBlocks[]{
				${getLocaleProperty({
					name: 'content',
					path: '^',
					locale,
				})},
        "situation": {
          ${getLocaleProperty({
						name: 'situationLinkTitle',
						locale,
					})},
          "url": situationReference->url,
          "showDate": situationReference->showDate,
          "showProtected": situationReference->showProtected,
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
			})},
			"contentBlocks": contentBlocks[]{
				${getLocaleProperty({
					name: 'content',
					path: '^',
					locale,
				})},
        "situation": {
          ${getLocaleProperty({
						name: 'situationLinkTitle',
						locale,
					})},
          "url": situationReference->url,
          "showDate": situationReference->showDate,
          "showProtected": situationReference->showProtected,
        }
      }
		},
		${getLocaleProperty({ name: 'situationsExceptionsTitle', locale })},
		"situationsExceptions": situationsExceptions[]{
			${getLocaleProperty({ name: 'title', locale })},
			${getLocaleProperty({
				name: 'titleSuffix',
				locale,
			})},
			${getLocaleProperty({
				name: 'content',
				locale,
			})},
      "contentBlocks": contentBlocks[]{
				${getLocaleProperty({
					name: 'content',
					path: '^',
					locale,
				})},
        "situation": {
          ${getLocaleProperty({
						name: 'situationLinkTitle',
						locale,
					})},
          "url": situationReference->url,
          "showDate": situationReference->showDate,
          "showProtected": situationReference->showProtected,
        }
      }
		},
		"noMatch": {
			${getLocaleProperty({ name: 'title', path: 'noMatch.title', locale })},
			${getLocaleProperty({ name: 'content', path: 'noMatch.content', locale })},
		},
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
	paths: ['nl', 'en'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});
