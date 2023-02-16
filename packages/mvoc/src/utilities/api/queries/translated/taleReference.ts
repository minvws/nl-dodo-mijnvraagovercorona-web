import { ContentBlockProps } from '@design-system/components/ContentBlock';
import { customBlockQuery } from './customBlock';

export interface TaleCollectionProps {
	taleCollection: {
		title: string;
		content?: ContentBlockProps['value'];
	}[];
}

export const taleReferenceQuery = (): string => {
	return `taleCollection[]->{
		title,
		${customBlockQuery({ name: 'content' })},
	}`;
};
