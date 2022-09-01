/** @jsx jsx */
import React from 'react';
import slugify from 'slugify';
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
	TheSidebar,
	Retain,
	ListAnchor,
	Stack,
	Feedback,
	getFeedbackUrl,
	usePreviewSubscription,
} from '@quarantaine/common';

import { locales } from 'content/general-content';
import { Page } from 'components/page';
import {
	AssistanceRow,
	ContentSituationBlock,
	ContentSituationBlockProps,
	Masthead,
	MoreTips,
} from 'components/molecules';
import {
	getTipPageQuery,
	getTips,
	getTipsCollection,
	TipCollectionProps,
} from 'utilities/tips';
import { SiteSettings } from 'content/site-settings';

interface StoryProps {
	title: string;
	contentBlocks?: ContentSituationBlockProps[];
	overview: {
		title: string;
		icon: SanityImageFullProps;
	};
}

interface MoreTipsProps extends TipCollectionProps {
	title: string;
}

interface PageContent {
	metaData: {
		title: string;
		description: string;
		socialShareImage: SanityImageFullProps;
	};
	header: {
		title: string;
		content: Array<Object>;
		image: SanityImageFullProps;
		showTOC: boolean;
	};
	stories: StoryProps[];
	moreTips: MoreTipsProps;
	sources: {
		title: string;
		content: Array<Object>;
	};
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

interface TipPageProps {
	preview: boolean;
	page: PageContent;
	siteSettings: SiteSettings;
	locale: Locales;
	query: string;
}

export const Tip = ({
	preview,
	page: serverPage,
	siteSettings,
	locale,
	query,
}: TipPageProps) => {
	const {
		data: { page: previewPage },
	} = usePreviewSubscription(query, {
		params: { locale },
		initialData: { page: serverPage, siteSettings },
		enabled: preview,
	});

	const page: PageContent = previewPage || serverPage;

	const translatedStories = page.stories.filter((story) => story.title);
	const translatedTips = page.moreTips.tipCollection
		? page.moreTips.tipCollection.filter((tip) => tip.title)
		: [];
	const tocStories = translatedStories.filter((story) => story.overview.title);

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
				}}
			>
				<Masthead
					title={page.header.title}
					illustration={page.header.image}
					prefixSlot={
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
					}
				>
					<ContentBlock content={page.header.content} />
					{page.header.showTOC ? (
						<ListAnchor
							as="ol"
							items={tocStories.map((story) => ({
								label: story.overview.title,
								href: `#${slugify(story.title, { strict: true, lower: true })}`,
								image: story.overview.icon?.src,
							}))}
						/>
					) : null}
				</Masthead>
				<Layer backgroundColor="transparant">
					<Container>
						<TheSidebar asideOffset={[0]}>
							<Retain>
								<Stack spacing={['3.5rem']}>
									{translatedStories.map((story, index) => (
										<Box
											as="section"
											id={slugify(story.title, {
												strict: true,
												lower: true,
											})}
											key={index}
										>
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

									{translatedTips.length ? (
										<MoreTips
											tipCollection={translatedTips}
											title={page.moreTips.title}
										/>
									) : null}

									{page.sources.content ? (
										<Box
											as="footer"
											sx={{
												backgroundColor: 'headerBackground',
												color: 'header',
												borderRadius: 'box',
												padding: '1.5rem',
											}}
										>
											<Stack spacing={['1rem']}>
												<Styled.h2>
													{page.sources.title
														? page.sources.title
														: siteSettings.sources}
												</Styled.h2>
												<ContentBlock content={page.sources.content} />
											</Stack>
										</Box>
									) : null}

									<Feedback
										name="Situatie Advies"
										feedbackUrl={getFeedbackUrl(siteSettings.feedback.url, {
											source: 'tip',
											advice: page.slug,
										})}
									/>
								</Stack>
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>
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

type TipProps = { tip: string };

export const getStaticPaths = async () => {
	const tips: TipProps[] = await getTips();

	return {
		paths: tips.reduce(
			(paths: TipStaticParams[], tip: TipProps): TipStaticParams[] => [
				...paths,
				...locales.map((locale) => ({
					params: { ...tip, locale },
				})),
			],
			[],
		),

		fallback: false,
	};
};

interface TipStaticParams {
	params: { tip: string; locale: Locales };
}

interface TipStaticProps extends TipStaticParams {
	preview: boolean;
}

export const getStaticProps = async ({
	params: { tip, locale },
	preview = false,
}: TipStaticProps) => {
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
			${getLocaleProperty({
				name: 'content',
				path: 'header.content',
				locale,
				block: true,
			})},
			${getImage({ name: 'image', path: 'header.image', full: true })},
			"showTOC": header.showTOC
		},
		"stories": stories[] {
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
		"moreTips": {
			${getLocaleProperty({ name: 'title', path: 'moreTips.title', locale })},
			${getTipsCollection({ path: 'moreTips', locale })},
		},
		"sources": {
			${getLocaleProperty({ name: 'title', path: 'sources.title', locale })},
			${getLocaleProperty({
				name: 'content',
				path: 'sources.content',
				locale,
				block: true,
			})},
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
	const query = getTipPageQuery({
		pageProjection,
		locale,
		tip,
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

export default Tip;
