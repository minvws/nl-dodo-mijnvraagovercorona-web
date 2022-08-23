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
	Stack,
	StyledLink,
	ContentBlock,
	getImage,
	SanityImageFullProps,
	TheGrid,
	SectionHeadingGroup,
	SectionHeadingGroupWithIcon,
	getHrefWithlocale,
} from '@quarantaine/common';
import { AssistanceRow, Masthead, ThemeOverview } from 'components/molecules';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';
import { getThemeCollection, ThemeCollectionProps } from 'utilities/theme';
import {
	getQuestionCollection,
	QuestionCollectionProps,
} from 'utilities/question';
import { useHashRedirectService } from 'utilities/use-hash-redirect-service';

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
		socialShareImage: SanityImageFullProps;
	};
	header: {
		title: string;
		chapeau: string;
		subtitle: string;
		image: SanityImageFullProps;
	};
	important: ImportantProps;
	themes: ThemesProps;
	help: {
		title: string;
		openingHours: string;
		question: string;
	};
	feedback: {
		title: string;
		button: string;
	};
	assistance: {
		chat: string;
		image: SanityImageFullProps;
		open: string;
		openingHours: string;
		phonenumber: string;
		situationButton: string;
		situationQuestion: string;
		tekstWithChat: string;
		tekstWithoutChat: string;
		title: string;
	};
	url: string;
}

export default function LandingPage({ locale }: { locale: Locales }) {
	const page = useSanityPageContent<PageContent>();

	useHashRedirectService();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				shareImage={page.metaData.socialShareImage}
				url={page.url}
				skipPageSuffix
			/>

			<Page
				headerProps={{
					variant: 'highlight',
					noPadding: true,
				}}
			>
				<Masthead
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
					<Styled.p sx={{ color: 'primary' }}>{page.header.subtitle}</Styled.p>
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
											<ContentBlock content={page.important.content} />
										) : null}
									</SectionHeadingGroupWithIcon>
									<TheGrid minItemSize="25rem" gap={['1rem']}>
										{page.important.questionCollection
											?.filter((item) => item.title)
											.map((item, index) => (
												<StyledLink
													key={index}
													styledAs="button-tile"
													href={getHrefWithlocale(`/${item.path}`, locale)}
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
									<SectionHeadingGroup title={page.themes.title}>
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
							<AssistanceRow feedback />
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
			${getImage({
				name: 'socialShareImage',
				path: 'metaData.socialShareImage',
				full: true,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
			${getLocaleProperty({ name: 'chapeau', path: 'header.chapeau', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			${getImage({ name: 'image', path: 'header.image', full: true })},
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
			${getQuestionCollection({ path: 'important', locale })},
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
		"assistance": assistanceReference->{
			${getLocaleProperty({ name: 'chat', locale })},
			${getImage({ name: 'image', full: true })},
			${getLocaleProperty({ name: 'open', locale })},
			${getLocaleProperty({ name: 'openingHours', locale })},
			phonenumber,
			${getLocaleProperty({ name: 'situationButton', locale })},
			${getLocaleProperty({ name: 'situationQuestion', locale })},
			${getLocaleProperty({ name: 'tekstWithChat', locale })},
			${getLocaleProperty({ name: 'tekstWithoutChat', locale })},
			${getLocaleProperty({ name: 'title', locale })},
		},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'mijn-vraag-over-corona',
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
