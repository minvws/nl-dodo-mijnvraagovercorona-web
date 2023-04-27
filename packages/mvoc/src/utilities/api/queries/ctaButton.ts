import { ContentBlockProps } from '@design-system/components/ContentBlock';
import {
	customBlockQuery,
	internalPageReferenceInSelectQuery,
	SubFolderReferenceProps,
} from '.';

export interface CtaButtonCollectionProps {
	ctaButtonCollection: {
		label: ContentBlockProps['value'];
		slugCollection?: {
			slug: string;
			subFolderReference: SubFolderReferenceProps;
		};
	}[];
}

export const ctaButtonCollectionQuery = (): string => {
	return `ctaButtonCollection[]->{
		${customBlockQuery({ name: 'label' })},
		"slugCollection": select(
			defined(href) => {
				"slug": href,
			},
			${internalPageReferenceInSelectQuery()},
		),
	}`;
};
