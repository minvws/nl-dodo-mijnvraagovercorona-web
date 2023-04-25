import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { imageQuery, ImageProps } from './queries';
import {
	AssistanceProps,
	assistanceQuery,
} from './queries/translated/assistance';

import {
	HeroProps,
	heroQuery,
	pageQuery,
	PageProps,
	customBlockQuery,
	taleReferenceQuery,
	TaleCollectionProps,
} from './queries/translated';
import { ButtonProps, buttonsQuery } from './queries/translated/buttons';
import {
	CtaButtonCollectionProps,
	ctaButtonCollectionQuery,
} from './queries/translated/ctaButton';

export interface PageHomeProps extends PageProps {
	hero: HeroProps;
	button?: ButtonProps;
	locale: string;
	assistance: AssistanceProps;
	important: {
		title: string;
		content: ContentBlockProps['value'];
		icon: ImageProps;
		ctaButtonCollection: CtaButtonCollectionProps['ctaButtonCollection'];
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
			button: ButtonProps;
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
			button: ButtonProps;
		};
	};
	taleCollection: TaleCollectionProps['taleCollection'];
}

export async function getDataHome() {
	const projection = `{
		${heroQuery()},
		${assistanceQuery()},
		${buttonsQuery({ array: false })},
		important{
			title,
			${customBlockQuery({ name: 'content' })},
			${imageQuery({ name: 'icon' })},
			${ctaButtonCollectionQuery()},
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
				${buttonsQuery({ array: false })},
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
				${buttonsQuery({ array: false })},
			},
		},
		${taleReferenceQuery()},
	}`;

	const query = pageQuery({
		type: 'homepage',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
