import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { PageProps, customBlockQuery, pageQuery } from './queries/translated';
import {
	ImageProps,
	imageQuery,
} from './queries';

export interface ErrorPageProps extends PageProps {
	header: {
		chapeau?: string;
		title;
		image: ImageProps;
		content?: ContentBlockProps['value'];
	};
	button: {
		iconPicker?: object;
		buttonText: string;
	};
	content: ContentBlockProps['value'];
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataErrorPages() {
	const projection = `{
		header{
			chapeau,
			title,
			${imageQuery({ name: 'image' })},
			${customBlockQuery({ name: 'content' })},
		},
		button{
			iconPicker,
			buttonText,
		},
		${customBlockQuery({ name: 'content' })},
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
