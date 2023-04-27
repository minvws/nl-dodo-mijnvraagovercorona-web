import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { AlternativeTranslationsProps } from '@design-system/components/LocaleSelector';
import { IconProps } from '@design-system/elements/Icon';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../../helpers/get-page-translations';
import {
	PageProps,
	pageQuery,
	heroQuery,
	HeroProps,
	customBlockQuery,
} from '../queries';

export interface LocationsPageProps extends PageProps {
	hero: HeroProps;
	result: {
		loading: string;
		noResult: string;
	};
	filter: {
		searchLabel: string;
		noResult: string;
	};
	location: {
		openingHours: {
			title: string;
			content: ContentBlockProps['value'];
			unknownOpeningHours: string;
			openNow: string;
			openToday: string;
			openFrom: string;
			closed: string;
			feedback: {
				content: string;
				label: string;
			};
		};
		copyButton: {
			copy: string;
			copied: string;
		};
		instructions: ContentBlockProps['value'];
		note: ContentBlockProps['value'];
	};
	about: {
		title: string;
		items: {
			label: ContentBlockProps['value'];
			icon: IconProps['name'];
			vaccinationSeries?: string;
		}[];
	};
	bring: {
		title: string;
		items: {
			label: ContentBlockProps['value'];
			icon: IconProps['name'];
		}[];
	};
	expectations: {
		title: string;
		content: ContentBlockProps['value'];
	};
	informationTitle: string;
	locale: string;
	alternatives: AlternativeTranslationsProps[];
	slug: string;
}

export async function getDataLocationPages() {
	const projection = `{
		${heroQuery()},
		result{
			loading,
			noResult,
		},
		filter{
			searchLabel
		},
		location{
			openingHours{
				title,
				${customBlockQuery({ name: 'content' })},
				unknownOpeningHours,
				openNow,
				openToday,
				openFrom,
				closed,
				feedback{
					content,
					label
				}
			},
			copyButton{
				copy,
				copied,
			},
			${customBlockQuery({ name: 'instructions' })},
			${customBlockQuery({ name: 'note' })},
		},
		about{
			title,
			items[]{
				${customBlockQuery({ name: 'label' })},
				icon,
				vaccinationSeries,
			},
		},
		bring{
			title,
			items[]{
				${customBlockQuery({ name: 'label' })},
				icon,
			},
		},
		expectations{
			title,
			${customBlockQuery({ name: 'content' })},
		},
		"slug": slug.current,
	}`;

	const query = pageQuery({
		type: 'locations-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
