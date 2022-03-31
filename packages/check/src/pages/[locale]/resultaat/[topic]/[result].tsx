/** @jsx jsx */
import { Image, Styled, Box, jsx, Container } from 'theme-ui';
import React, { useState } from 'react';

import {
	Locales,
	Link,
	MetaTags,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	ContentBlock,
	Content,
	Feedback,
	getFeedbackUrl,
	useSanitySiteSettings,
	Header,
	Layer,
	Retain,
	TheSwitcher,
	TheSwitcherItem,
	Stack,
} from '@quarantaine/common';

import { getResultPageQuery, getResults } from 'utilities/topics';
import { locales } from 'content/general-content';
import { Page } from 'components/page';
import { MastheadFlow } from 'components/molecules';
import { LinkBack } from 'components/link-back';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	content: {
		image: string;
		title: string;
		button: string;
		href: string;
		content: Object[];
	};
	topic: string;
	slug: string;
}

export const Resultaat = ({ locale }: { locale: Locales }) => {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={`/resultaat/${page.topic}/${page.slug}`}
			/>

			<Page noHeader>
				<MastheadFlow
					title={page.header.title}
					illustration={null}
					headerSlot={
						<Header
							noPadding
							linkBackSlot={<LinkBack href="/#onderwerpen" variant="restart" />}
						/>
					}
				/>

				<Layer backgroundColor="white">
					<Container>
						{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
						<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
							<TheSwitcher gap={['2rem', '8rem']}>
								<TheSwitcherItem>
									<Image
										src={page.content.image}
										alt=""
										sx={{
											display: 'block',
											inlineSize: ['32rem'],
											maxInlineSize: ['14rem', '100%'],
											marginInlineStart: 'auto',
											marginInlineEnd: 'auto',
										}}
									/>
								</TheSwitcherItem>
								<Box
									sx={{
										order: [, -1],
									}}
								>
									<Retain>
										<Stack spacing={['1rem', '2rem']}>
											<Styled.h2>{page.content.title}</Styled.h2>
											<ContentBlock content={page.content.content} />
											<Link styledAs="button" href={page.content.href} external>
												{page.content.button}
											</Link>
											<Feedback
												name="Ondewerp Resultaat"
												feedbackUrl={getFeedbackUrl(siteSettings.feedback.url, {
													source: 'topic-result',
												})}
											/>
										</Stack>
									</Retain>
								</Box>
							</TheSwitcher>
						</Box>
					</Container>
				</Layer>
			</Page>
		</>
	);
};

type Result = { result: string; topic: string };

export const getStaticPaths = async () => {
	const results: Result[] = await getResults();

	return {
		paths: results.reduce(
			(
				paths: ResultaatStaticProps[],
				result: Result,
			): ResultaatStaticProps[] => [
				...paths,
				...locales.map((locale) => ({ params: { ...result, locale } })),
			],
			[],
		),

		fallback: false,
	};
};

interface ResultaatStaticProps {
	params: { result: string; topic: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { result, topic, locale },
}: ResultaatStaticProps) => {
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
			${getLocaleProperty({ name: 'title', path: `header.title`, locale })},
		},
		"content": {
			"image": "/images/sanity/" + content.image.asset->originalFilename,
			${getLocaleProperty({ name: 'title', path: `content.title`, locale })},
			${getLocaleProperty({ name: 'content', path: `content.content`, locale })},
			${getLocaleProperty({ name: 'href', path: `content.href`, locale })},
			${getLocaleProperty({ name: 'button', path: `content.button`, locale })},
		},
		"slug": slug.current,
		"topic": topic->slug.current,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getResultPageQuery({
			pageProjection,
			locale,
			result,
			topic,
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

export default Resultaat;
