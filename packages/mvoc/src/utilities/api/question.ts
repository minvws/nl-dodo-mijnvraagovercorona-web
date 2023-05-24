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
		type: 'multiple' | 'single' | 'datepicker';
		label: string;
		single?: {
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
			_key: string;
		}[];
		multiple?: {
			_key: string;
			content: string;
			checked?: boolean;
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

export async function getDataQuestionPages() {
	const projection = `{
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
			single[]{
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
			},
			multiple[]{
				_key,
				content,
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

	const query = pageQuery({
		type: 'question-page',
		projection,
		multiple: true,
	});

	const data = await useSanityClient().fetch(query);

	return getAdditionalPageData(data.pages);
}
