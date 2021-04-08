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
		ctas: {
			name: string;
			text: string;
			skipDatepicker: boolean;
		}[];
	}[];
	situationsOtherTitle: string;
	situationsOther: {
		title: string;
		content: Array<Object>;
		ctas: {
			name: string;
			text: string;
			skipDatepicker: boolean;
		}[];
	}[];
	situationsExceptionsTitle: string;
	situationsExceptions: {
		title: string;
		content: Array<Object>;
		ctas: {
			name: string;
			text: string;
			skipDatepicker: boolean;
		}[];
	}[];
	noMatch: {
		title: string;
		content: Array<Object>;
	};
	url: string;
	currentStepLabel: string;
}

const CtaWrapper: React.FC = ({ children }) => (
	<div
		sx={{
			a: {
				height: 'auto',
				minHeight: '55px',
				lineHeight: 1.5,
				py: '12px',
			},
		}}
	>
		{children}
	</div>
);

export default function JouwSituatie() {
	const page = useSanityPageContent<JouwSituatiePageContent>();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
			/>
			<Page title={page.header.title} sx={{ 'dd a': { marginBottom: '16px' } }}>
				<Hero>
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
							>
								<ContentBlock content={situation.content} />
								<CtaWrapper>
									{situation.ctas.map((cta) => (
										<Link
											key={cta.name}
											href={
												cta.skipDatepicker
													? `/nl/${cta.name}`
													: `/nl/${cta.name}/wanneer`
											}
											styledAs="button"
										>
											{cta.text}
										</Link>
									))}
								</CtaWrapper>
							</ExpansionPanel>
						))}
					</Box>
					<Box sx={{ my: '36px' }}>
						<Styled.h2>{page.situationsOtherTitle}</Styled.h2>

						{page.situationsOther.map((situation) => (
							<ExpansionPanel key={situation.title} title={situation.title}>
								<ContentBlock content={situation.content} />
								<CtaWrapper>
									{situation.ctas?.map((cta) => (
										<Link
											key={cta.name}
											href={
												cta.skipDatepicker
													? `/nl/${cta.name}`
													: `/nl/${cta.name}/wanneer`
											}
											styledAs="button"
										>
											{cta.text}
										</Link>
									))}
								</CtaWrapper>
							</ExpansionPanel>
						))}
					</Box>
					<Box sx={{ my: '36px' }}>
						<Styled.h2>{page.situationsExceptionsTitle}</Styled.h2>

						{page.situationsExceptions.map((situation) => (
							<ExpansionPanel key={situation.title} title={situation.title}>
								<ContentBlock content={situation.content} />
								<CtaWrapper>
									{situation.ctas?.map((cta) => (
										<Link
											key={cta.name}
											href={
												cta.skipDatepicker
													? `/nl/${cta.name}`
													: `/nl/${cta.name}/wanneer`
											}
											styledAs="button"
										>
											{cta.text}
										</Link>
									))}
								</CtaWrapper>
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
			"ctas": ctas[]{
				name,
				${getLocaleProperty({ name: 'text', locale })},
        		skipDatepicker
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
			"ctas": ctas[]{
				name,
				${getLocaleProperty({ name: 'text', locale })},
        		skipDatepicker
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
			"ctas": ctas[]{
				name,
				${getLocaleProperty({ name: 'text', locale })},
        		skipDatepicker
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
	paths: ['nl'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});
