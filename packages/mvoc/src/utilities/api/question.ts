import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { useSanityClient } from 'astro-sanity';
import {
	HeroProps,
	PageProps,
	PictureProps,
	SubFolderReferenceProps,
	customBlockQuery,
	heroQuery,
	pageQuery,
	pictureQuery,
	subFolderReferenceQuery,
	AssistanceProps,
	assistanceQuery,
	imageQuery,
	ImageProps,
} from './queries';
import { getAdditionalPageData } from '../helpers/getAdditionalPageData';

export interface QuestionPageProps extends PageProps {
	hero: HeroProps;
	content?: {
		columnOne: {
			content: ContentBlockProps['value'];
			picture?: PictureProps;
		};
		columnTwo?: {
			content?: ContentBlockProps['value'];
			picture?: PictureProps;
		};
	};
	question: {
		type: 'datepicker' | 'checkbox' | 'radio';
		label: string;
		content: ContentBlockProps['value'];
		multi?: {
			content: ContentBlockProps['value'];
			next: {
				_type: string;
				slug: string;
				answer?: {
					showOn?: Array<number>;
				}[];
				plan?: {
					showOn?: Array<number>;
					day?: number;
				}[];
				subFolderReference: SubFolderReferenceProps['subFolderReference'];
			};
			weight?: number;
			modalReference?: {
				title?: string;
				image?: ImageProps;
				content: ContentBlockProps['value'];
			};
			_key: string;
		}[];
		showMore?: {
			max: number;
			label: {
				this: string;
				that: string;
			};
		};
	};
	buttons: {
		_key: string;
		standard: boolean;
		assistanceDialog: boolean;
		text: string;
		next: {
			_type: string;
			slug: string;
			answer?: {
				showOn?: Array<number>;
			}[];
			plan?: {
				showOn?: Array<number>;
				day?: number;
			}[];
			subFolderReference: SubFolderReferenceProps['subFolderReference'];
		};
		disabled?: boolean;
	}[];
	assistance?: AssistanceProps;
	locale: string;
	slug: string;
}

export const questionPageProjection = `{
	${heroQuery()},
	"content": contentReference->{
		columnOne{
			${customBlockQuery({ name: 'content' })},
			${pictureQuery({})},
		},
		columnTwo{
			${customBlockQuery({ name: 'content' })},
			${pictureQuery({})},
		},
	},
	question{
		type,
		label,
		${customBlockQuery({ name: 'content' })},
		multi[]{
			_key,
			${customBlockQuery({ name: 'content' })},
			"next": next -> {
				_type,
				answer[]{
					showOn,
				},
				"plan": advice.plan[]{
					showOn,
					day,
				},
				"slug": slug.current,
				${subFolderReferenceQuery()},
			},
			weight,
			modalReference->{
				title,
				${imageQuery({ name: 'image' })},
				${customBlockQuery({ name: 'content' })},
			},
		},
	},
	buttons[]{
		_key,
		text,
		standard,
		assistanceDialog,
		"next": next -> {
			_type,
			answer[]{
				showOn,
			},
			"plan": advice.plan[]{
				showOn,
				day,
			},
			"slug": slug.current,
			${subFolderReferenceQuery()},
		},
	},
	${assistanceQuery()},
	"slug": slug.current,
}`;

export async function getDataQuestionPages() {
	const query = pageQuery({
		type: 'question-page',
		projection: questionPageProjection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
