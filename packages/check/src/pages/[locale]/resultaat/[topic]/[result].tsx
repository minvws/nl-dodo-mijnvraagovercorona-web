/** @jsx jsx */
import { Image, Styled, Box, jsx } from 'theme-ui';
import React, { useState } from 'react';

import {
	Locales,
	Link,
	MetaTags,
	Hero,
	Fieldset,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	cartesianProduct,
	ContentBlock,
	Content,
	RadioButton,
	getHrefWithlocale,
	Feedback,
	getFeedbackUrl,
	useSanitySiteSettings,
} from '@quarantaine/common';

import { getResultPageQuery, getResults, getTopics } from 'utilities/topics';
import { locales } from 'content/general-content';
import { Page } from 'components/page';

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

			<Page>
				<Hero title={page.header.title} />
				<Content>
					<Box sx={{ mt: '32px', display: 'flex', justifyContent: 'center' }}>
						<Image src={page.content.image} alt="" />
					</Box>
					<Box sx={{ mt: '32px' }}>
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
					</Box>
				</Content>
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
