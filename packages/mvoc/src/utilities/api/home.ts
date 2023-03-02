import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { Locale } from '../locale/translation';
import { imageQuery, localePropertyQuery, ImageProps } from './queries';
import { AssistanceProps, assistanceQuery } from './queries/assistance';
import {
	QuestionCollectionProps,
	questionCollectionQuery,
} from './queries/question';
import { ThemeCollectionProps, themeCollectionQuery } from './queries/theme';
import {
	HeroProps,
	heroQuery,
	pageQuery,
	PageProps,
} from './queries/translated';

export interface PageHomeProps extends PageProps {
	hero: HeroProps;
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataHome() {
	const projection = `{
		${heroQuery()},
	}`;

	const query = pageQuery({
		type: 'homepage',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}

export async function getDataHomeByLocale({ locale }: { locale: Locale }) {
	const projection = `{
		${heroQuery()},
	}`;

	const query = pageQuery({
		type: 'homepage',
		projection,
		multiple: false,
		locale,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pageData, false);
}
