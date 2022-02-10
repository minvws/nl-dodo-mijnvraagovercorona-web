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
} from '@quarantaine/common';
import {
	getJouwSituatiePageSituationsProjection,
	JouwSituatiePageSituationsContent,
	renderPanel,
} from './jouw-situatie';

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

	const uitleg = page.uitleg[0];

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

				<Box
					backgroundColor="headerBackground"
					sx={{
						paddingBlockEnd: ['40px'],
					}}
				>
					<Container>
						<Flex
							sx={{
								flexDirection: ['column', 'row'],
							}}
						>
							<BodyContainer noPaddingY>
								<Stack spacing={['36px']}>
									<Stack spacing={['16px']}>
										<Styled.h2>{page.situationsYouTitle}</Styled.h2>
										{page.situationsYou.map((situation) =>
											renderPanel(situation, 'plusalt'),
										)}
									</Stack>
									<Stack spacing={['16px']}>
										<Styled.h2>{page.situationsOtherTitle}</Styled.h2>
										{page.situationsOther.map((situation) =>
											renderPanel(situation, 'plusalt'),
										)}
									</Stack>
								</Stack>
							</BodyContainer>
							<Aside>
								<BannerDataProtection content={siteSettings.privacy} />
							</Aside>
						</Flex>
					</Container>
				</Box>

				<Container
					sx={{
						paddingBlockStart: ['40px'],
						paddingBlockEnd: ['40px'],
					}}
				>
					<Flex
						sx={{
							flexDirection: ['column', 'row'],
						}}
					>
						<BodyContainer noPaddingY>
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
						</BodyContainer>
						<Aside hideOnDesktop>
							<BannerDataProtection content={siteSettings.privacy} />
						</Aside>
					</Flex>
				</Container>
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
