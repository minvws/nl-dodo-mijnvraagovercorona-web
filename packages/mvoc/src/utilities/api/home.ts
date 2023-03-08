import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { ButtonVariants } from '@design-system/elements/Button';
import { IconProps } from '@design-system/elements/Icon';
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
	customBlockQuery,
	interimQuestionCollectionQuery,
	InterimQuestionCollectionProps,
} from './queries/translated';

export interface PageHomeProps extends PageProps {
	hero: HeroProps;
	button?: {
		label: string;
		href?: string;
		variant: ButtonVariants;
		icon: IconProps['name'];
	};
	locale: string;
	important: {
		title: string;
		content: ContentBlockProps['value'];
		icon: ImageProps;
		questionCollection: InterimQuestionCollectionProps['questionCollection'];
	};
	alternatives: AlternativeTranslationsProps[];
	slug: string;
	currentAdvice: {
		title: string;
		content: ContentBlockProps['value'];
		adviceYes: {
			title: string;
			content: ContentBlockProps['value'];
			image: ImageProps;
			items: {
				label: string;
				content: ContentBlockProps['value'];
				image: ImageProps;
			}[];
			button: {
				label: string;
				href?: string;
				variant: ButtonVariants;
				icon: IconProps['name'];
			};
		};
		adviceNo: {
			title: string;
			content: ContentBlockProps['value'];
			image: ImageProps;
			items: {
				label: string;
				content: ContentBlockProps['value'];
				image: ImageProps;
			}[];
			button: {
				label: string;
				href?: string;
				variant: ButtonVariants;
				icon: IconProps['name'];
			};
		};
	};
}

export async function getDataHome() {
	const projection = `{
		${heroQuery()},
		button,
		important{
			title,
			${customBlockQuery({ name: 'content' })},
			${imageQuery({ name: 'icon' })},
			${interimQuestionCollectionQuery()},
		},
		currentAdvice{
			title,
			${customBlockQuery({ name: 'content' })},
			adviceYes{
				title,
				${customBlockQuery({ name: 'content' })},
				${imageQuery({ name: 'image' })},
				items[]{
					label,
					${imageQuery({ name: 'image' })},
					${customBlockQuery({ name: 'content' })},
				},
				button{
					label,
					href,
					icon,
					variant,
				}
			},
			adviceNo{
				title,
				${customBlockQuery({ name: 'content' })},
				${imageQuery({ name: 'image' })},
				items[]{
					label,
					${imageQuery({ name: 'image' })},
					${customBlockQuery({ name: 'content' })},
				},
				button{
					label,
					href,
					icon,
					variant,
				}
			},
		},
	}`;

	const query = pageQuery({
		type: 'homepage',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
