import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import {
	PageProps,
	customBlockQuery,
	pageQuery,
	buttonsQuery,
	ButtonProps,
	heroQuery,
	HeroProps,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

export interface ErrorPageProps extends PageProps {
	hero: HeroProps;
	button: ButtonProps;
	content: ContentBlockProps['value'];
	errormessage: string;
	locale: string;
	slug: string;
}

export async function getDataErrorPages() {
	const projection = `{
		${heroQuery()},
		${buttonsQuery({ array: false })},
		${customBlockQuery({ name: 'content' })},
		errormessage,
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'error-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
