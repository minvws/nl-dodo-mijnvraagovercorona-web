import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import { getPageTranslations } from '../helpers/get-page-translations';
import { ImageProps, imageQuery } from './queries';
import {
	InterimQuestionCollectionProps,
	interimQuestionCollectionQuery,
	PageProps,
	pageQuery,
	TaleCollectionProps,
	taleReferenceQuery,
} from './queries/translated';
import {
	AssistanceProps,
	assistanceQuery,
} from './queries/translated/assistance';

export interface ThemePageProps
	extends PageProps,
		InterimQuestionCollectionProps {
	header: {
		title: string;
		chapeau: string;
		content: ContentBlockProps['value'];
		image: ImageProps;
	};
	titleFlow: string;
	assistance: AssistanceProps;
	questionCollection: InterimQuestionCollectionProps['questionCollection'];
	taleCollection: TaleCollectionProps['taleCollection'];
	slug: string;
	updatedAt: string;
}

export async function getDataThemes() {
	const projection = `{
		header{
			title,
			chapeau,
			content,
			${imageQuery({ name: 'image' })},
		},
		titleFlow,
		${interimQuestionCollectionQuery()},
		${assistanceQuery()},
		${taleReferenceQuery()},
		"updatedAt": _updatedAt,
		"slug": slug.current
	}`;

	const query = pageQuery({
		type: 'theme-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getPageTranslations(data.pages);
}
