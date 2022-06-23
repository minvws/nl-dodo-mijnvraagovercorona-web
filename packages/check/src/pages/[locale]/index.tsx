/** @jsx jsx */
import React from 'react';
import slugify from 'slugify';
import { jsx, Styled, Container, Box } from 'theme-ui';
import { Page } from 'components/page';

import {
	MetaTags,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	Locales,
	Retain,
	Layer,
	TheSwitcher,
	TheSwitcherItem,
	Header,
	Stack,
	StyledLink,
	ContentBlock,
	getImage,
	SanityImageFullProps,
	TheGrid,
	SectionHeadingGroup,
	SectionHeadingGroupWithIcon,
} from '@quarantaine/common';
import {
	HulpPanel,
	FeedbackPanel,
	Masthead,
	AdviceProps,
	CaseProps,
	ThemeOverview,
} from 'components/molecules';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';
import { getThemeCollection, ThemeCollectionProps } from 'utilities/theme';
import {
	getQuestionCollection,
	QuestionCollectionProps,
} from 'utilities/question';

interface ThemesProps extends ThemeCollectionProps {
	title: string;
	content: Array<Object>;
}

interface ImportantProps extends QuestionCollectionProps {
	title: string;
	content: Array<Object>;
	icon: SanityImageFullProps;
}

export interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		chapeau: string;
		subtitle: string;
		image: SanityImageFullProps;
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
	important: ImportantProps;
	themes: ThemesProps;
	titleCases: string;
	imageMobileCases: string;
	imageDesktopCases: string;
	cases: CaseProps[];
	situations: {
		title: string;
		situations: {
			name: string;
			slug: string;
			start: string;
		}[];
	};
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
					prefixSlot={
						<Styled.p
							sx={{
								fontSize: ['h2Mobile', 'h2'],
								lineHeight: ['h2Mobile', 'h2'],
								fontWeight: 'bold',
								color: 'headerTertiary',
							}}
						>
							{page.header.chapeau}
						</Styled.p>
					}
					illustration={page.header.image}
					variant="highlight"
				>
					<Styled.p>{page.header.subtitle}</Styled.p>
				</Masthead>

				<Layer
					backgroundColor="headerBackground"
					pullUpBy="2rem"
					id={slugify(page.important.title, {
						strict: true,
						lower: true,
					})}
				>
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<Retain maxWidth={[retainMaxWidth, '100%']}>
								<Stack spacing={'3rem'}>
									<SectionHeadingGroupWithIcon
										title={page.important.title}
										icon={page.important.icon.src}
									>
										{page.important.content ? (
											<ContentBlock content={page.themes.content} />
										) : null}
									</SectionHeadingGroupWithIcon>
									<TheGrid minItemSize="25rem" gap={['1rem']}>
										{page.important.questionCollection?.map((item, index) => (
											<StyledLink
												key={index}
												styledAs="button-tile"
												href={`/situatie/${item.question.slug}`}
											>
												<ContentBlock content={item.title} />
											</StyledLink>
										))}
									</TheGrid>
								</Stack>
							</Retain>
						</Box>
					</Container>
				</Layer>

				<Layer
					id={slugify(page.themes.title, {
						strict: true,
						lower: true,
					})}
				>
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<Retain maxWidth={[retainMaxWidth, '100%']}>
								<Stack spacing={'3rem'}>
									<SectionHeadingGroup title={page.themes.title} align="center">
										{page.themes.content ? (
											<ContentBlock content={page.themes.content} />
										) : null}
									</SectionHeadingGroup>

									<ThemeOverview
										themeCollection={page.themes.themeCollection}
									/>
								</Stack>
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
			${getImage({ name: 'image', path: 'header.image', full: true })},
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
					${getImage({ name: 'icon' })},
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
					${getImage({ name: 'icon' })},
				}
			}
		},
		"important": {
			${getLocaleProperty({ name: 'title', path: 'important.title', locale })},
			${getLocaleProperty({
				name: 'content',
				path: 'important.content',
				locale,
				block: true,
			})},
			${getImage({ name: 'icon', path: 'important.icon', full: true })},
			${getQuestionCollection({ path: 'important', locale })}
		},
		"themes": {
			${getLocaleProperty({ name: 'title', path: 'themes.title', locale })},
			${getLocaleProperty({
				name: 'content',
				path: 'themes.content',
				locale,
				block: true,
			})},
			${getThemeCollection({ path: 'themes', locale })},
		},
		${getLocaleProperty({ name: 'titleCases', locale })},
		${getImage({ name: 'imageMobileCases' })},
		${getImage({ name: 'imageDesktopCases' })},
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
				"situationNew": {
					${getLocaleProperty({
						name: 'situationLinkTitle',
						locale,
					})},
					"start": situationReference->start->slug.current,
					"slug": situationReference->slug.current,
				},
				"situation": {
					${getLocaleProperty({
						name: 'situationLinkTitle',
						locale,
					})},
					"url": situationReference->url,
					"showDate": situationReference->showDate,
					"showExceptions": situationReference->showExceptions,
				},

			}
		},
		"topics": {
			${getLocaleProperty({ name: 'title', path: 'topics.title', locale })},
			"topics": topics.topics[]->{
				${getImage({ name: 'icon' })},
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
