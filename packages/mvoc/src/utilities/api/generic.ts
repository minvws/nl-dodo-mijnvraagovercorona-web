import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type { Locale } from '../locale/translation';
import { pageQuery, PageProps, localePropertyQuery } from './queries';

export interface GenericPageProps extends PageProps {
	title: string;
	content: ContentBlockProps['value'];
}

export async function getDataGenericPages({
	locale,
	slug,
}: {
	locale: Locale;
	slug?: string;
}) {
	const projection = `{
		${localePropertyQuery({ name: 'title', locale })},
		${localePropertyQuery({ name: 'content', locale, block: true })},
	}`;

	const pages = [
		'privacy-page',
		'cookies-page',
		'copyright-page',
		'toegankelijkheid-page',
		'kwetsbaarheid-melden-page',
	];

	const test = pages.map(async (page) => {
		const query = pageQuery({
			type: page,
			projection,
			locale,
			slug,
			multiple: false,
		});

		return {
			slug: page.replace('-page', ''),
			data: await useSanityClient().fetch(query),
		};
	});

	return await test;
}
