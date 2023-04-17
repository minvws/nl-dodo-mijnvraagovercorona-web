import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import {
	PageProps,
	customBlockQuery,
	pageQuery,
	buttonsQuery,
	ButtonProps,
	heroQuery,
	HeroProps,
} from './queries/translated';
import { ImageProps, imageQuery } from './queries';

export interface ErrorPageProps extends PageProps {
	hero: HeroProps;
	button: ButtonProps;
	content: ContentBlockProps['value'];
	errormessage: string;
	locale: string;
	alternatives: AlternativeTranslationsProps[];
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

	return getPageTranslations(data.pages);
}
