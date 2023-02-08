import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { PageProps, customBlockQuery, pageQuery } from './queries/translated';

export interface LocationsPageProps extends PageProps {
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataLocationPages() {
	const projection = `{
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'locations-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
