import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { PageProps, customBlockQuery, pageQuery } from './queries/translated';
import { ImageProps, imageQuery } from './queries';
import { ButtonVariants } from '@design-system/elements/Button';
import { IconProps } from '@design-system/elements/Icon';

export interface ErrorPageProps extends PageProps {
	hero: {
		chapeau?: string;
		title;
		image: ImageProps;
		content?: ContentBlockProps['value'];
	};
	button: {
		label: string;
		href?: string;
		variant: ButtonVariants;
		icon: IconProps['name'];
	};
	content: ContentBlockProps['value'];
	errormessage: string;
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataErrorPages() {
	const projection = `{
		hero{
			chapeau,
			title,
			${imageQuery({ name: 'image' })},
			${customBlockQuery({ name: 'content' })},
		},
		button{
			icon,
			label,
			variant,
			href,
		},
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
