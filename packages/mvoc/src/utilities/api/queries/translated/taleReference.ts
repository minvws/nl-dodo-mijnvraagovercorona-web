import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { ImageProps, imageQuery } from '../image';
import { buttonsQuery, ButtonProps } from './buttons';
import { customBlockQuery } from './customBlock';

export interface TaleCollectionProps {
	taleCollection: {
		title: string;
		multiContentBlocks: {
			content?: ContentBlockProps['value'];
			image?: ImageProps;
			button?: ButtonProps;
		}[];
	}[];
}

export const taleReferenceQuery = (): string => {
	return `taleCollection[]->{
		title,
		multiContentBlocks[]{
			${customBlockQuery({ name: 'content' })},
			${imageQuery({ name: 'image' })},
			${buttonsQuery({ array: false })},
		},
	}`;
};
