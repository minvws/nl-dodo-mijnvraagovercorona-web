import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { ButtonVariants } from '@design-system/elements/Button';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../../helpers/get-page-translations';
import {
	PageProps,
	pageQuery,
	heroQuery,
	HeroProps,
	customBlockQuery,
	taleReferenceQuery,
	TaleCollectionProps,
	ButtonsProps,
	buttonsQuery,
} from '../queries/translated';

export interface PZALandingPageProps extends PageProps {
	hero: HeroProps;
	buttons: ButtonsProps;
	contentSecondary: ContentBlockProps['value'];
	taleCollection: TaleCollectionProps['taleCollection'];
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataPZALandingPages() {
	const projection = `{
		${heroQuery()},
		${buttonsQuery({ array: true })},
		${customBlockQuery({ name: 'contentSecondary' })},
		${taleReferenceQuery()},
		"slug": "prikkenzonderafspraak",
	}`;

	const query = pageQuery({
		type: 'pza-landing-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
