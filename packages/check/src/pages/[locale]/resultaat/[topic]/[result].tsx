/** @jsx jsx */
import { jsx } from 'theme-ui';
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
	answers: {
		content: Object[];
		next: string;
		_key: string;
	}[];
	button: string;
	topic: string;
	slug: string;
}

export const Resultaat = ({ locale }: { locale: Locales }) => {
	const page = useSanityPageContent<PageContent>();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={`/resultaat/${page.topic}/${page.slug}`}
			/>

			<Page>
				<Hero title={page.header.title} />
				<Content></Content>
			</Page>
		</>
	);
};

export const getStaticPaths = async () => {
	const topics = await getTopics();
	const results = await getResults();

	return {
		paths: cartesianProduct(topics, results, locales).map(
			([topic, result, locale]: string[]) => ({
				params: { topic, result, locale },
			}),
		),

		fallback: false,
	};
};

interface ResultaatStaticProps {
	params: { result: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { result, locale },
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
		"answers": answers[]{
			_key,
			${getLocaleProperty({ name: 'content', locale })},
			"next": select(
					next->_type == "topic-result-document" => "resultaat",
					next->_type == "topic-question-document" => "vraag",
				) + '/' + next->topic->slug.current + '/' + next->slug.current,
		},
		${getLocaleProperty({ name: 'button', locale })},
		"slug": slug.current,
		"topic": topic->slug.current,
		steps,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getResultPageQuery({
			pageProjection,
			locale,
			result,
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
