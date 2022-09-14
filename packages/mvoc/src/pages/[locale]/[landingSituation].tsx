/** @jsxImportSource theme-ui */
import { Box, Container, jsx, Themed } from 'theme-ui';
import React from 'react';

import {
	Locales,
	MetaTags,
	getLocaleProperty,
	getImage,
	getClient,
	SanityImageFullProps,
	ContentBlock,
	Layer,
	Retain,
	Stack,
	usePreviewSubscription,
} from '@quarantaine/common';

import { locales } from 'content/general-content';
import { Page } from 'components/page';
import { AnswerSwitch, Masthead } from 'components/molecules';
import {
	getLandingSituationPageQuery,
	getLandingSituations,
} from 'utilities/landing-situations';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';
import {
	essentialQuestionPageProjection,
	QuestionPageContent,
} from './situatie/[question]';
import { SiteSettings } from 'content/site-settings';

interface PageContent {
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
	question: QuestionPageContent;
	slug: string;
}

interface LandingSituationProps {
	preview: boolean;
	page: PageContent;
	siteSettings: SiteSettings;
	locale: Locales;
	query: string;
}

export const LandingSituation = ({
	locale,
	query,
	page: serverPage,
	siteSettings,
	preview,
}: LandingSituationProps) => {
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
					variant: 'highlight',
				}}
			>
				<Masthead
					title={page.header.title}
					prefixSlot={
						page.header.chapeau ? (
							<Themed.p
								sx={{
									fontSize: ['h2Mobile', 'h2'],
									lineHeight: ['h2Mobile', 'h2'],
									fontWeight: 'bold',
									color: 'headerTertiary',
								}}
							>
								{page.header.chapeau}
							</Themed.p>
						) : null
					}
					illustration={page.header.image}
					variant="highlight"
				>
					<ContentBlock content={page.header.content} />
				</Masthead>

				<Layer backgroundColor="headerBackground" pullUpBy="2rem">
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<Retain maxWidth={[retainMaxWidth, '100%']}>
								<Stack>
									<Themed.h2>{page.question.header.title}</Themed.h2>
								</Stack>
							</Retain>
						</Box>
					</Container>
				</Layer>

				<AnswerSwitch locale={locale} {...page.question} />
			</Page>
		</>
	);
};

type LandingSituationQueryParam = { landingSituation: string };

type LandingSituationParams = {
	params: { landingSituation: string; locale: Locales };
};

export const getStaticPaths = async () => {
	const landingSituations: LandingSituationQueryParam[] = await getLandingSituations();

	return {
		paths: landingSituations.reduce(
			(
				paths: LandingSituationParams[],
				landingSituation: LandingSituationQueryParam,
			): LandingSituationParams[] => [
				...paths,
				...locales.map((locale) => ({
					params: { ...landingSituation, locale },
				})),
			],
			[],
		),
		fallback: false,
	};
};

interface LandingSituationStaticProps {
	params: { landingSituation: string; locale: Locales };
	preview: boolean;
}

export const getStaticProps = async ({
	params: { landingSituation, locale },
	preview = false,
}: LandingSituationStaticProps) => {
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
		"question": situationReference->{
			${essentialQuestionPageProjection({ locale: locale })}
		},
		"slug": slug.current,
	}`;
	const query = getLandingSituationPageQuery({
		pageProjection,
		locale,
		landingSituation,
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

export default LandingSituation;
