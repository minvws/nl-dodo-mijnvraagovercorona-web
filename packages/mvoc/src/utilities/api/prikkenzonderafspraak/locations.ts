import type { ContentBlockProps } from '@design-system/components/ContentBlock';
import type { IconProps } from '@design-system/elements/Icon';
import { useSanityClient } from 'astro-sanity';
import type { PageProps, HeroProps } from '../queries';
import { pageQuery, heroQuery, customBlockQuery } from '../queries';
import { getAdditionalPageData } from 'src/utilities/helpers/getAdditionalPageData';

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

	return getAdditionalPageData(data.pages);
}
