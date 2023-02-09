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
} from '../queries/translated';

export interface PZALandingPageProps extends PageProps {
	hero: HeroProps;
	buttons: {
		label: string;
		href?: string;
		variant: ButtonVariants;
	}[];
	contentSecondary: ContentBlockProps['value'];
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataPZALandingPages() {
	const projection = `{
		${heroQuery()},
		buttons[]{
			label,
			href,
			variant,
		},
		${customBlockQuery({ name: 'contentSecondary' })},
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
