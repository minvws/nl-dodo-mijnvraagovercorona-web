/** @jsx jsx */
import React from 'react';
import { Box, Container, jsx, Styled } from 'theme-ui';

import {
	Locales,
	MetaTags,
	getClient,
	getLocaleProperty,
	getImage,
	SanityImageFullProps,
	ContentBlock,
	formatLongDate,
	Layer,
	Stack,
	usePreviewSubscription,
	TheGrid,
	StyledLink,
	getHrefWithlocale,
	Retain,
	useCurrentLocale,
} from '@quarantaine/common';

import { locales } from 'content/general-content';
import { Page } from 'components/page';
import {
	AssistanceRow,
	ContentSituationBlock,
	ContentSituationBlockProps,
	Masthead,
} from 'components/molecules';
import { getThemePageQuery, getThemes } from 'utilities/theme';
import { SiteSettings } from 'content/site-settings';
import {
	getQuestionCollection,
	QuestionCollectionProps,
} from 'utilities/question';

interface StoryProps {
	title: string;
	contentBlocks?: ContentSituationBlockProps[];
	overview: {
		title: string;
		icon: SanityImageFullProps;
	};
}

interface PageContent extends QuestionCollectionProps {
	metaData: {
		title: string;
		description: string;
		socialShareImage: SanityImageFullProps;
	};
	header: {
		title: string;
		chapeau: string;
		content: Array<Object>;
		image: SanityImageFullProps;
	};
	titleFlow: string;
	stories: StoryProps[];
	updatedAt: string;
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
	slug: string;
}

interface ThemePageProps {
	preview: boolean;
	page: PageContent;
	siteSettings: SiteSettings;
	locale: Locales;
	query: string;
}

export const Theme = ({
	preview,
	page: serverPage,
	siteSettings,
	locale,
	query,
}: ThemePageProps) => {
	const {
		data: { page: previewPage },
	} = usePreviewSubscription(query, {
		params: { locale },
		initialData: { page: serverPage, siteSettings },
		enabled: preview,
	});

	const page: PageContent = previewPage || serverPage;
	const currentLocale = useCurrentLocale();

	const translatedStories = page.stories
		? page.stories.filter((story) => story.title)
		: [];

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				shareImage={page.metaData.socialShareImage}
				url={`/${page.slug}`}
				skipPageSuffix
			/>
			<Page
				headerProps={{
					noPadding: true,
					variant: 'highlight',
				}}
			>
				<Masthead
					title={page.header.title}
					illustration={page.header.image}
					variant="highlight"
					prefixSlot={
						<Stack spacing={['0.5rem']}>
							<Styled.p
								sx={{
									fontSize: ['1rem', '1rem'],
									lineHeight: ['smallTextMobile', 'smallText'],
									color: 'detailText',
								}}
							>
								{siteSettings.updatedAt}{' '}
								<time dateTime={page.updatedAt}>
									{formatLongDate(new Date(page.updatedAt), locale)}
								</time>
							</Styled.p>
							{page.header.chapeau ? (
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
							) : null}
						</Stack>
					}
				>
					<Box sx={{ color: 'primary' }}>
						<ContentBlock content={page.header.content} />
					</Box>
				</Masthead>

				<Layer
					backgroundColor={
						// change background color based on the availability of stories
						translatedStories.length > 0 ? 'headerBackground' : 'transparent'
					}
				>
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<Stack>
								<Styled.h2>
									{page.questionCollection.length > 1
										? `${page.questionCollection.length} ${siteSettings.situationPlural.that}`
										: `${page.questionCollection.length} ${siteSettings.situationPlural.this}`}{' '}
									{page.titleFlow}
								</Styled.h2>
								<TheGrid minItemSize="25rem" gap={['1rem']}>
									{page.questionCollection
										?.filter((item) => item.title)
										.map((item, index) => (
											<StyledLink
												key={index}
												styledAs="button-tile"
												href={getHrefWithlocale(
													`/${item.path}`,
													currentLocale.urlPrefix,
												)}
											>
												<ContentBlock content={item.title} />
											</StyledLink>
										))}
								</TheGrid>
							</Stack>
						</Box>
					</Container>
				</Layer>

				{translatedStories.length > 0 ? (
					<Layer backgroundColor="transparent">
						<Container>
							<Retain>
								<Stack spacing={['3.5rem']}>
									{translatedStories.map((story, index) => (
										<Box as="section" key={index}>
											<Stack spacing={['1rem']}>
												<Styled.h2>{story.title}</Styled.h2>
												{story.contentBlocks && (
													<ContentSituationBlock
														contentBlocks={story.contentBlocks}
													/>
												)}
											</Stack>
										</Box>
									))}
								</Stack>
							</Retain>
						</Container>
					</Layer>
				) : null}

				{page.assistance && (
					<Layer backgroundColor="headerBackground">
						<Container>
							{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
							<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
								<AssistanceRow feedback={false} />
							</Box>
						</Container>
					</Layer>
				)}
			</Page>
		</>
	);
};

type ThemeProps = { theme: string };

export const getStaticPaths = async () => {
	const themes: ThemeProps[] = await getThemes();

	return {
		paths: themes.reduce(
			(paths: ThemeStaticParams[], theme: ThemeProps): ThemeStaticParams[] => [
				...paths,
				...locales.map((locale) => ({
					params: { ...theme, locale },
				})),
			],
			[],
		),

		fallback: false,
	};
};

interface ThemeStaticParams {
	params: { theme: string; locale: Locales };
}

interface ThemeStaticProps extends ThemeStaticParams {
	preview: boolean;
}

export const getStaticProps = async ({
	params: { theme, locale },
	preview = false,
}: ThemeStaticProps) => {
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
			${getLocaleProperty({
				name: 'content',
				path: 'header.content',
				locale,
				block: true,
			})},
			${getImage({ name: 'image', path: 'header.image', full: true })},
		},
		${getLocaleProperty({
			name: 'titleFlow',
			locale,
		})},
		${getQuestionCollection({ locale })},
		"stories": stories[]-> {
			${getLocaleProperty({ name: 'title', locale })},
			"overview": {
				${getLocaleProperty({ name: 'title', path: 'overview.title', locale })},
				${getImage({ name: 'icon', path: 'overview.icon', full: true })},
			},
			"contentBlocks": contentBlocks[]{
				${getLocaleProperty({
					name: 'content',
					path: '@',
					locale,
					block: true,
				})},
				${getImage({ name: 'image', path: '@', full: true })},
				"video": {
					"url": @.url,
					${getLocaleProperty({
						name: 'title',
						path: '@.title',
						locale,
					})},
					${getImage({ name: 'image', path: '@.image', full: true })},
				},
				"situation": {
					${getLocaleProperty({
						name: 'situationLinkTitle',
						locale,
					})},
					"path": select(
						situationReference->_type == "situation-question-document" => 'situatie/' + situationReference->slug.current,
						situationReference->_type == "situation-result-document" => 'advies/' + situationReference->slug.current,
					),
				},
			},
		},
		"assistance": assistanceReference->{
			${getLocaleProperty({ name: 'chat', locale })},
			${getImage({ name: 'image', full: true })},
			${getLocaleProperty({ name: 'open', locale })},
			${getLocaleProperty({ name: 'openingHours', locale })},
			${getLocaleProperty({ name: 'openingHoursPhonenumber', locale })},
			phonenumber,
			${getLocaleProperty({ name: 'tekstWithChat', locale })},
			${getLocaleProperty({ name: 'tekstWithoutChat', locale })},
			${getLocaleProperty({ name: 'title', locale })},
		},
		"updatedAt": _updatedAt,
		"slug": slug.current,
	}`;
	const query = getThemePageQuery({
		pageProjection,
		locale,
		theme,
	});
	const { page, siteSettings } = await getClient(preview).fetch(query);

	return {
		props: {
			preview,
			page,
			siteSettings,
			locale,
			query,
		},
	};
};

export default Theme;
