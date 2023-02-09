import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../../helpers/get-page-translations';
import { PageProps, customBlockQuery, pageQuery } from '../queries/translated';

export interface PZALandingPageProps extends PageProps {
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataPZALandingPages() {
	const projection = `{
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'pza-landing-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
