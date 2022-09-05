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
import { getThemePageQuery, getThemes } from 'utilities/theme';
import { SiteSettings } from 'content/site-settings';

interface StoryProps {
	title: string;
	contentBlocks?: ContentSituationBlockProps[];
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
				</Masthead>
				<Layer backgroundColor="transparant">
					<Container>
						<TheSidebar asideOffset={[0]}>
							<Retain>
								<Stack spacing={['3.5rem']}></Stack>
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
			${getLocaleProperty({
				name: 'content',
				path: 'header.content',
				locale,
				block: true,
			})},
			${getImage({ name: 'image', path: 'header.image', full: true })},
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
