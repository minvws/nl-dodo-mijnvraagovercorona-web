import type { ContentBlockProps } from '@modules/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import type {
	HeroProps,
	PageProps,
	TaleCollectionProps,
	AssistanceProps,
	ImageProps,
	ButtonProps,
	CardsProps,
	CtaButtonCollectionProps,
	MoreInfoProps,
	PictureProps,
} from './queries';
import {
	heroQuery,
	pageQuery,
	customBlockQuery,
	taleReferenceQuery,
	assistanceQuery,
	imageQuery,
	buttonsQuery,
	ctaButtonCollectionQuery,
	cardQuery,
	moreInfoQuery,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';
import type { ThemePageProps } from './theme';
import { themePageProjection } from './theme';

export interface PageHomeProps extends PageProps {
	hero: HeroProps;
	cards?: CardsProps;
	button?: ButtonProps;
	locale: string;
	assistance: AssistanceProps;
	showFeedback?: boolean;
	important: {
		title: string;
		content: ContentBlockProps['value'];
		icon: PictureProps['image'];
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
			image: PictureProps['image'];
			items: {
				label: string;
				content: ContentBlockProps['value'];
				image: PictureProps['image'];
			}[];
			button: ButtonProps;
		};
		adviceNo: {
			title: string;
			content: ContentBlockProps['value'];
			image: PictureProps['image'];
			items: {
				label: string;
				content: ContentBlockProps['value'];
				image: PictureProps['image'];
			}[];
			button: ButtonProps;
		};
	};
	taleCollection: TaleCollectionProps['taleCollection'];
	moreInfo: MoreInfoProps;
	themes: ThemePageProps[];
}

export async function getDataHome() {
	const projection = `{
		${heroQuery()},
		${cardQuery()},
		${assistanceQuery()},
		${buttonsQuery({ array: false })},
		showFeedback,
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
		${moreInfoQuery()},
		"themes": *[_type == 'theme-page' && __i18n_lang == ^.__i18n_lang]${themePageProjection},
	}`;

	const query = pageQuery({
		type: 'homepage',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
