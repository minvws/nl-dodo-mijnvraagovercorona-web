/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { Page } from 'components/page';

import {
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	MetaTags,
	ContentBlock,
	useSanityPageContent,
	Content,
	Hero,
} from '@quarantaine/common';

interface GeenAdviesPageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		pretitle: string;
	};
	content: Array<Object>;
	url: string;
}

export default function GeenAdvies() {
	const page = useSanityPageContent<GeenAdviesPageContent>();

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
			/>
			<Page showRetryLink>
				<Hero title={page.header.title} titlePrefix={page.header.pretitle} />
				<Content>
					<ContentBlock content={page.content} />
				</Content>
			</Page>
		</>
	);
}

interface GeenAdviesStaticProps {
	params: { locale: 'nl' | 'en' };
}

export const getStaticProps = async ({
	params: { locale },
}: GeenAdviesStaticProps) => {
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
      ${getLocaleProperty({
				name: 'pretitle',
				path: 'header.pretitle',
				locale,
			})},
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
		},
		url,
    ${getLocaleProperty({ name: 'content', path: 'content', locale })},
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'geen-advies-page',
			pageProjection,
			locale,
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

export const getStaticPaths = () => ({
	paths: ['nl'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});
