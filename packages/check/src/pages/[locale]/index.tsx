/** @jsx jsx */
import React, { useContext, useEffect } from 'react';
import { jsx, Styled, Container, Box, Image } from 'theme-ui';
import { Page } from 'components/page';

import {
	MetaTags,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	useSanitySiteSettings,
	Hero,
	getFeedbackUrl,
	Locales,
	Retain,
	Layer,
	TheSwitcher,
	TheSwitcherItem,
	Header,
	Stack,
	TheThirds,
	StyledLink,
	getHrefWithlocale,
	useCurrentLocale,
	ContentBlock,
} from '@quarantaine/common';
import {
	Folder,
	FolderProps,
	HulpPanel,
	FeedbackPanel,
	Masthead,
	AdviceList,
	AdviceProps,
	CaseProps,
	Case,
	ContentSituationBlock,
} from 'components/molecules';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';
import GlobalContext from 'utilities/global-context';

export interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		chapeau: string;
		subtitle: string;
		image: string;
	};
	currentSituation: {
		title: string;
		measures: {
			title: string;
			content: Array<Object>;
			advice: AdviceProps[];
		};
		advice: {
			title: string;
			content: Array<Object>;
			advice: AdviceProps[];
		};
	};
	titleCases: string;
	imageMobileCases: string;
	imageDesktopCases: string;
	cases: CaseProps[];
	topics: {
		title: string;
		topics: {
			icon: string;
			name: string;
			slug: string;
			start: string;
		}[];
	};
	help: {
		title: string;
		openingHours: string;
		question: string;
	};
	feedback: {
		title: string;
		button: string;
	};
	url: string;
}

export default function LandingPage() {
	const page = useSanityPageContent<PageContent>();
	const locale = useCurrentLocale();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
				skipPageSuffix
			/>

			<Page noHeader>
				<Masthead
					headerSlot={<Header transparent noPadding />}
					title={page.header.title}
					chapeau={page.header.chapeau}
					illustration={page.header.image}
				>
					<Styled.p>{page.header.subtitle}</Styled.p>
				</Masthead>

				<Layer backgroundColor="headerBackground" pullUpBy="2rem">
					<Container>
						<Box
							sx={{
								paddingX: ['mobilePadding', 'tabletPadding', 0],
							}}
						>
							<Retain maxWidth={[retainMaxWidth, '100%']}>
								<Stack>
									<Styled.h2>{page.currentSituation.title}</Styled.h2>
									<TheThirds
										split={page.currentSituation.measures.advice.length > 0}
										asideChildren={
											<Stack spacing={['1rem']}>
												<Styled.h3>
													{page.currentSituation.measures.title}
												</Styled.h3>
												{page.currentSituation.measures.content ? (
													<ContentBlock
														content={page.currentSituation.measures.content}
													/>
												) : null}
												<AdviceList
													advices={page.currentSituation.measures.advice}
												/>
											</Stack>
										}
									>
										<Stack spacing={['1rem']}>
											<Styled.h3>
												{page.currentSituation.advice.title}
											</Styled.h3>
											{page.currentSituation.advice.content ? (
												<ContentBlock
													content={page.currentSituation.advice.content}
												/>
											) : null}
											<AdviceList
												advices={page.currentSituation.advice.advice}
											/>
										</Stack>
									</TheThirds>
								</Stack>
							</Retain>
						</Box>
					</Container>
				</Layer>

				<Layer>
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<Retain maxWidth={[retainMaxWidth, '100%']}>
								<Stack spacing={['2.25rem', '4rem']} id="situaties">
									<Box
										id="situaties"
										sx={{
											position: 'relative',
											paddingBlockStart: ['0', '10rem'],
											paddingBlockEnd: ['0', '2.5rem'],
										}}
									>
										<Styled.h2
											sx={{
												position: 'relative',
												marginBlockEnd: ['2rem', 0],
												fontSize: ['h1Mobile', 'h1'],
												lineHeight: ['h1Mobile', 'h1'],
												zIndex: 2,
											}}
										>
											{page.titleCases}
										</Styled.h2>
										<Image
											src={page.imageMobileCases}
											alt=""
											sx={{
												display: ['block', 'none'],
												marginInlineStart: 'auto',
												marginInlineEnd: 'auto',
											}}
										/>
										<Image
											src={page.imageDesktopCases}
											alt=""
											sx={{
												position: 'absolute',
												zIndex: 1,
												display: ['none', 'block'],
												inlineSize: '100%',
												blockSize: '100%',
												insetBlockStart: 0,
												insetBlockEnd: 0,
												insetInlineStart: 0,
												insetInlineEnd: 0,
												objectFit: 'contain',
												objectPosition: '100% 100%',
											}}
										/>
									</Box>
									<Box
										sx={{
											display: 'grid',
											gridTemplateColumns:
												'repeat(auto-fit, minmax(min(28rem, 100%), 1fr))',
											gap: ['1rem', '4rem'],
											alignItems: 'start',
											paddingInlineStart: 0,
											listStyle: 'none',
										}}
									>
										{page.cases
											.filter((item) => item.title)
											.map((item) => (
												<Case
													key={item.title}
													title={item.title}
													titleSuffix={item.titleSuffix}
													intro={item.intro}
													readMoreLabel={item.readMoreLabel}
												>
													{item.contentBlocks && (
														<ContentSituationBlock
															contentBlocks={item.contentBlocks}
														/>
													)}
												</Case>
											))}
									</Box>
								</Stack>
								<Box
									sx={{
										marginBlockStart: ['4.75rem', '6.5rem'],
										marginBlockEnd: ['2.25rem', '4rem'],
									}}
									id="onderwerpen"
								>
									<Styled.h2
										sx={{
											fontSize: ['h1Mobile', 'h1'],
											lineHeight: ['h1Mobile', 'h1'],
										}}
									>
										{page.topics.title}
									</Styled.h2>
									<Box
										sx={{
											display: 'flex',
											flexDirection: ['column', 'row'],
											gap: ['1rem', '3rem'],
											'& > *': {
												flex: 1,
											},
										}}
									>
										{page.topics.topics.map(({ start, slug, icon, name }) => (
											<StyledLink
												styledAs="button-large"
												href={getHrefWithlocale(
													`/vraag/${slug}/${start}`,
													locale.urlPrefix,
												)}
												icon={icon}
												key={name}
											>
												{name}
											</StyledLink>
										))}
									</Box>
								</Box>
							</Retain>
						</Box>
					</Container>
				</Layer>

				<Layer backgroundColor="headerBackground">
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<TheSwitcher gap={['4rem', '4rem']}>
								<TheSwitcherItem blockAlign="center">
									<FeedbackPanel />
								</TheSwitcherItem>
								<TheSwitcherItem blockAlign="center">
									<HulpPanel />
								</TheSwitcherItem>
							</TheSwitcher>
						</Box>
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
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
			${getLocaleProperty({ name: 'chapeau', path: 'header.chapeau', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			"image": "/images/sanity/" + header.image.asset->originalFilename,
		},

		"currentSituation": {
			${getLocaleProperty({ name: 'title', path: 'currentSituation.title', locale })},
			"measures": {
				${getLocaleProperty({
					name: 'title',
					path: 'currentSituation.measures.title',
					locale,
				})},
				${getLocaleProperty({
					name: 'content',
					path: 'currentSituation.measures.content',
					locale,
				})},
				"advice": currentSituation.measures.advice[]{
					${getLocaleProperty({ name: 'title', locale })},
					${getLocaleProperty({ name: 'subtitle', locale })},
					"icon": "/images/sanity/" + icon.asset->originalFilename,
				}
			},
			"advice": {
				${getLocaleProperty({
					name: 'title',
					path: 'currentSituation.advice.title',
					locale,
				})},
				${getLocaleProperty({
					name: 'content',
					path: 'currentSituation.advice.content',
					locale,
				})},
				"advice": currentSituation.advice.advice[]{
					${getLocaleProperty({ name: 'title', locale })},
					${getLocaleProperty({ name: 'subtitle', locale })},
					"icon": "/images/sanity/" + icon.asset->originalFilename,
				}
			}
		},

		${getLocaleProperty({ name: 'titleCases', locale })},
		"imageMobileCases": "/images/sanity/" + imageMobileCases.asset->originalFilename,
		"imageDesktopCases": "/images/sanity/" + imageDesktopCases.asset->originalFilename,
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
		"topics": {
			${getLocaleProperty({ name: 'title', path: 'topics.title', locale })},
			"topics": topics.topics[]->{
				"icon": "/images/sanity/" + icon.asset->originalFilename,
				${getLocaleProperty({ name: 'name', locale })},
				"start": start->slug.current,
				"slug": slug.current,
			},
		},
		"help": {
			${getLocaleProperty({ name: 'title', path: 'help.title', locale })},
			${getLocaleProperty({ name: 'question', path: 'help.question', locale })},
			${getLocaleProperty({
				name: 'openingHours',
				path: 'help.openingHours',
				locale,
			})},
		},
		"feedback": {
			${getLocaleProperty({ name: 'title', path: 'feedback.title', locale })},
			${getLocaleProperty({ name: 'button', path: 'feedback.button', locale })},
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
