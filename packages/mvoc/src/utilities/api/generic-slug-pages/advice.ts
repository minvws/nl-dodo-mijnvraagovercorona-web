import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../../helpers/get-page-translations';
import {
	HeroProps,
	PageProps,
	heroQuery,
	pageQuery,
} from '../queries/translated';

export interface AdvicePageProps extends PageProps {
	hero: HeroProps;
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataAdvicePages() {
	const projection = `{
		${heroQuery()},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'advice-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
