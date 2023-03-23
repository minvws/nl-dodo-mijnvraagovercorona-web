import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { ButtonVariants } from '@design-system/elements/Button';
import { IconProps } from '@design-system/elements/Icon';
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
	interimQuestionCollectionQuery,
	InterimQuestionCollectionProps,
	taleReferenceQuery,
	TaleCollectionProps,
} from './queries/translated';
import { ButtonProps, buttonsQuery } from './queries/translated/buttons';

export interface PageHomeProps extends PageProps {
	hero: HeroProps;
	button?: ButtonProps;
	locale: string;
	assistance: AssistanceProps;
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
