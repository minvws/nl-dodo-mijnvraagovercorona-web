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

interface JouwSituatiePageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	situationsYouTitle: string;
	situationsYou: {
		title: string;
		titleSuffix?: string;
		content: Array<Object>;
	}[];
	situationsOtherTitle: string;
	situationsOther: {
		title: string;
		content: Array<Object>;
	}[];
	situationsExceptionsTitle: string;
	situationsExceptions: {
		title: string;
		content: Array<Object>;
	}[];
	noMatch: {
		title: string;
		content: Array<Object>;
	};
	url: string;
	currentStepLabel: string;
}

export default function JouwSituatie() {
	const page = useSanityPageContent<JouwSituatiePageContent>();
	console.log(page);
	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
			/>
			<Page>
				<Hero title={page.header.title}>
					<ProgressMarker
						currentStageLabel={page.currentStepLabel}
						currentStage={1}
					/>
				</Hero>
				<Content>
					<Box sx={{ mt: '36px' }}>
						<Styled.h2>{page.situationsYouTitle}</Styled.h2>
						{page.situationsYou.map((situation) => (
							<ExpansionPanel
								key={situation.title}
								title={situation.title}
								titleSuffix={situation.titleSuffix}
								variant="plus"
							>
								<ContentBlock content={situation.content} />
							</ExpansionPanel>
						))}
					</Box>
					<Box sx={{ my: '36px' }}>
						<Styled.h2>{page.situationsOtherTitle}</Styled.h2>

						{page.situationsOther.map((situation) => (
							<ExpansionPanel
								key={situation.title}
								title={situation.title}
								variant="plus"
							>
								<ContentBlock content={situation.content} />
							</ExpansionPanel>
						))}
					</Box>
					<Box sx={{ my: '36px' }}>
						<Styled.h2>{page.situationsExceptionsTitle}</Styled.h2>

						{page.situationsExceptions.map((situation) => (
							<ExpansionPanel
								key={situation.title}
								title={situation.title}
								variant="plus"
							>
								<ContentBlock content={situation.content} />
							</ExpansionPanel>
						))}
					</Box>

					<Styled.h2>{page.noMatch.title}</Styled.h2>
					<ContentBlock content={page.noMatch.content} />
				</Content>
			</Page>
		</>
	);
}

interface JouwSituatieStaticProps {
	params: { locale: 'nl' | 'en' };
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
					locale,
				})},
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
