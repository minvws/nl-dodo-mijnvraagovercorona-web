/** @jsx jsx */
import React from 'react';
import slugify from 'slugify';
import { Box, Container, Image, jsx, Styled } from 'theme-ui';

import {
	Locales,
	MetaTags,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	Header,
	getImage,
	SanityImageFullProps,
	ContentBlock,
	useSanitySiteSettings,
	formatLongDate,
	Layer,
	TheSidebar,
	BannerDataProtection,
	Retain,
	StyledLink,
	ListAnchor,
	Stack,
} from '@quarantaine/common';

import { locales } from 'content/general-content';
import { Page } from 'components/page';
import { Masthead } from 'components/molecules';
import { getTipPageQuery, getTips } from 'utilities/tips';
import {
	getQuestionCollection,
	QuestionCollectionProps,
} from 'utilities/question';

interface StoryProps extends QuestionCollectionProps {
	title: string;
	content: Array<Object>;
	image: SanityImageFullProps;
	video: {
		url: string;
	};
	overview: {
		title: string;
		icon: SanityImageFullProps;
	};
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
	sources: {
		title: string;
		content: Array<Object>;
	};
	updatedAt: string;
	slug: string;
}

export const Tip = ({ locale }: { locale: Locales }) => {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();

	console.log('page', page);

	const translatedStories = page.stories.filter((story) => story.title);
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
			<Page noHeader>
				<Masthead
					headerSlot={<Header transparent noPadding />}
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
						<TheSidebar asideChildren={<mark>Sidebar</mark>} asideOffset={[0]}>
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
												<ContentBlock content={story.content} />
												{story.image?.src ? (
													<Image src={story.image.src} alt="" />
												) : null}
												{story.questionCollection
													? story.questionCollection.map((question, index) => (
															<StyledLink
																key={index}
																href={question.path}
																styledAs="button"
															>
																<ContentBlock content={question.title} />
															</StyledLink>
													  ))
													: null}
												{story.video.url ? (
													<mark>Video component: {story.video.url}</mark>
												) : null}
											</Stack>
										</Box>
									))}

									<Box>
										<mark>More tips</mark>
									</Box>

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
								</Stack>
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>
			</Page>
		</>
	);
};

type TipProps = { tip: string };

export const getStaticPaths = async () => {
	const tips: TipProps[] = await getTips();

	return {
		paths: tips.reduce(
			(paths: TipStaticProps[], tip: TipProps): TipStaticProps[] => [
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

interface TipStaticProps {
	params: { tip: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { tip, locale },
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
			${getLocaleProperty({ name: 'content', locale, block: true })},
			${getImage({ name: 'image', full: true })},
			"overview": {
				${getLocaleProperty({ name: 'title', path: 'overview.title', locale })},
				${getImage({ name: 'icon', path: 'overview.icon', full: true })},
			},
			${getQuestionCollection({ locale })},
			"video": {
				"url":video.url,
			},
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
		"updatedAt": _updatedAt,
		"slug": slug.current,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getTipPageQuery({
			pageProjection,
			locale,
			tip,
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

export default Tip;
