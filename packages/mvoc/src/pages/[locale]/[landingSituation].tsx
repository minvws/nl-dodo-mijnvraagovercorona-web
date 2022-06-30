/** @jsx jsx */
import { Box, Container, jsx, Styled } from 'theme-ui';
import React from 'react';

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
	Layer,
	Retain,
	Stack,
} from '@quarantaine/common';

import { locales } from 'content/general-content';
import { Page } from 'components/page';
import { Masthead } from 'components/molecules';
import {
	getLandingSituationPageQuery,
	getLandingSituations,
} from 'utilities/landing-situations';
import { retainMaxWidth } from '@quarantaine/common/src/components/molecules/layout/retain';

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
	question: {
		title: string;
	};
	slug: string;
}

export const LandingSituation = ({ locale }: { locale: Locales }) => {
	const page = useSanityPageContent<PageContent>();

	console.log('page', page);

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
					prefixSlot={
						page.header.chapeau ? (
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
									<Styled.h2>{page.question.title}</Styled.h2>
								</Stack>
							</Retain>
						</Box>
					</Container>
				</Layer>

				<Layer>
					<Container>
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<Retain maxWidth={[retainMaxWidth, '100%']}>
								<mark>Vraag</mark>
							</Retain>
						</Box>
					</Container>
				</Layer>
			</Page>
		</>
	);
};

type LandingSituationProps = { landingSituation: string };

export const getStaticPaths = async () => {
	const landingSituations: LandingSituationProps[] = await getLandingSituations();

	return {
		paths: landingSituations.reduce(
			(
				paths: LandingSituationStaticProps[],
				landingSituation: LandingSituationProps,
			): LandingSituationStaticProps[] => [
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
}

export const getStaticProps = async ({
	params: { landingSituation, locale },
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
		"question": {
			${getLocaleProperty({
				name: 'title',
				path: 'situationReference->header.title',
				locale,
			})},
		},
		"slug": slug.current,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getLandingSituationPageQuery({
			pageProjection,
			locale,
			landingSituation,
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

export default LandingSituation;
