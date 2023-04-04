import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import { pageQuery, PageProps } from '.';
import { ImageProps, imageQuery } from '../image';
import { AssistanceProps, assistanceQuery } from './assistance';
import {
	interimQuestionCollectionQuery,
	InterimQuestionCollectionProps,
	taleReferenceQuery,
	TaleCollectionProps,
} from '.';

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
	const projection = `
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

	return await useSanityClient().fetch(query);
}
