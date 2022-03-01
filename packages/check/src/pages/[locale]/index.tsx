/** @jsx jsx */
import React from 'react';
import { Box, Container, Flex, jsx, Styled } from 'theme-ui';

import { Page } from 'components/page';

import {
	SectionInformational,
	MetaTags,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	useSanitySiteSettings,
	Hero,
	Feedback,
	getFeedbackUrl,
	Locales,
	ContentBlock,
	BodyContainer,
	BannerDataProtection,
	Aside,
	Stack,
	Module,
	TheSidebar,
	Retain,
	Layer,
	ExpansionPanel,
	Link,
} from '@quarantaine/common';
import {
	ContentBlocks,
	getJouwSituatiePageSituationsProjection,
	getUrlBySituation,
	JouwSituatiePageSituationsContent,
	renderPanel,
} from './jouw-situatie';
import { Case } from 'components/molecules';

interface PageContent extends JouwSituatiePageSituationsContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		button: string;
		pretitle: string;
		subtitle: string;
		title: string;
	};
	titleCases: string;
	cases: {
		title: string;
		titleSuffix?: string;
		intro?: string;
		readMoreLabel?: string;
		contentBlocks: Array<Object>;
	}[];
	uitleg: {
		description: string;
		image: string;
		pretitle: string;
		title: string;
		linklist: {
			id: string;
			usp: string;
		};
	}[];
	url: string;
}

export default function LandingPage() {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();

	// Only show first uitleg
	const uitleg = page.uitleg[0];
	// Only show cases when a title is present (case is translated)
	const cases = page.cases.filter((item) => item.title);

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
				skipPageSuffix
			/>

			<Page>
				<Hero title={page.header.title}>
					<Styled.p
						sx={{
							fontWeight: 'light',
							width: ['80%', '549px'],
							fontSize: '26px',
							lineHeight: ['30px', '36px'],
							marginTop: 0,
							marginBottom: ['18px'],
							color: 'roHighlight',
						}}
					>
						{page.header.subtitle}
					</Styled.p>
				</Hero>

				<Layer backgroundColor="headerBackground" noPaddingBlockStart>
					<Container>
						<TheSidebar
							hideAsideOnMobile
							asideChildren={
								<BannerDataProtection content={siteSettings.privacy} />
							}
						>
							<Retain>
								<Stack spacing={['36px']}>
									<Stack spacing={['16px']}>
										<Styled.h2 sx={{ color: 'secondary', fontSize: 'chapeau' }}>
											{page.titleCases}
										</Styled.h2>
										{cases.map((item) => (
											<Case
												key={item.title}
												title={item.title}
												titleSuffix={item.titleSuffix}
												intro={item.intro}
												readMoreLabel={item.readMoreLabel}
											>
												{item.contentBlocks.map(
													(contentBlock: ContentBlocks, key: number) => {
														if (contentBlock.content) {
															return (
																<div key={key}>
																	<ContentBlock
																		content={contentBlock.content}
																	/>
																</div>
															);
														} else if (contentBlock.situation?.url) {
															return (
																<Link
																	key={key}
																	styledAs="button"
																	href={getUrlBySituation(
																		contentBlock.situation,
																	)}
																	sx={{
																		marginBottom: '8px',
																		marginTop: '8px',
																	}}
																>
																	{contentBlock.situation.situationLinkTitle}
																</Link>
															);
														}
													},
												)}
											</Case>
										))}

										{page.situationsYou.map((situation) =>
											renderPanel(situation, 'plusalt'),
										)}
									</Stack>
								</Stack>
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>

				<Layer>
					<Container>
						<TheSidebar
							hideAsideOnTablet
							asideChildren={
								<BannerDataProtection content={siteSettings.privacy} />
							}
						>
							<Retain>
								<Stack spacing={['44px']}>
									<Module>
										<Styled.h2>{page.noMatch.title}</Styled.h2>
										<ContentBlock content={page.noMatch.content} />
									</Module>

									<SectionInformational
										imageUrl={uitleg.image}
										imageAlignment="right"
										key={uitleg.title}
										id={uitleg.linklist.id}
										chapeau={uitleg.pretitle}
										title={uitleg.title}
									>
										<Styled.p>{uitleg.description}</Styled.p>
									</SectionInformational>

									<Feedback
										name="Your Situation"
										feedbackUrl={getFeedbackUrl(siteSettings.feedback.url, {
											source: 'your-situation',
										})}
									/>
								</Stack>
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>
			</Page>
		</>
	);
}

interface LandingStaticProps {
	params: { locale: Locales };
}

export const getStaticProps = async ({
	params: { locale },
}: LandingStaticProps) => {
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
			${getLocaleProperty({ name: 'button', path: 'header.button', locale })},
			${getLocaleProperty({ name: 'pretitle', path: 'header.pretitle', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
		},
		${getLocaleProperty({ name: 'titleCases', locale })},
		"cases": cases[]{
			${getLocaleProperty({ name: 'title', locale })},
			${getLocaleProperty({
				name: 'titleSuffix',
				locale,
			})},
			${getLocaleProperty({
				name: 'intro',
				locale,
			})},
			${getLocaleProperty({
				name: 'readMoreLabel',
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
					"showExceptions": situationReference->showExceptions,
				}
			}
		},
		"uitleg": uitleg[]{
			"image": "/images/sanity/" + image.asset->originalFilename,
			${getLocaleProperty({ name: 'description', locale })},
			${getLocaleProperty({ name: 'pretitle', locale })},
			${getLocaleProperty({ name: 'title', locale })},
			"linklist": {
				${getLocaleProperty({ name: 'id', path: 'linklist.id', locale })},
				${getLocaleProperty({ name: 'usp', path: 'linklist.usp', locale })},
			},
		},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'check-landing-page',
			pageProjection,
			locale,
		}),
	);

	const jouwSituatiePageSituationsProjection = `{${getJouwSituatiePageSituationsProjection(
		locale,
	)}}`;

	const { page: jouwSituatiePage } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'jouw-situatie-page',
			pageProjection: jouwSituatiePageSituationsProjection,
			locale,
		}),
	);

	return {
		props: {
			page: { ...page, ...jouwSituatiePage },
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
