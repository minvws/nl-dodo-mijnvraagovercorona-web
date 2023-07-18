import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import {
	HeroProps,
	heroQuery,
	pageQuery,
	PageProps,
	customBlockQuery,
	taleReferenceQuery,
	TaleCollectionProps,
	AssistanceProps,
	assistanceQuery,
	imageQuery,
	ImageProps,
	ButtonProps,
	buttonsQuery,
	ctaButtonCollectionQuery,
	CardsProps,
	cardQuery,
	CtaButtonCollectionProps,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

export interface PageHomeProps extends PageProps {
	hero: HeroProps;
	cards?: CardsProps;
	button?: ButtonProps;
	locale: string;
	assistance: AssistanceProps;
	important: {
		title: string;
		content: ContentBlockProps['value'];
		icon: ImageProps;
		filter?: boolean;
		ctaButtonCollection: CtaButtonCollectionProps['ctaButtonCollection'];
	};
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
	themes: {
		overview: {
			title: string;
		};
		ctaButtonCollection: CtaButtonCollectionProps['ctaButtonCollection'];
		slug: string;
		localeID: string;
	}[];
}

export async function getDataHome() {
	const projection = `{
		${heroQuery()},
		${cardQuery()},
		${assistanceQuery()},
		${buttonsQuery({ array: false })},
		important{
			title,
			${customBlockQuery({ name: 'content' })},
			${imageQuery({ name: 'icon' })},
			filter,
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
		"themes": *[_type == 'theme-page']{
			overview{
				title
			},
			${ctaButtonCollectionQuery()},
			"localeID": __i18n_lang,
			"slug": slug.current,
		},
	}`;

	const query = pageQuery({
		type: 'homepage',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
