import { ContentBlockProps } from '@design-system/components/ContentBlock';
import {
	customBlockQuery,
	internalPageReferenceInSelectQuery,
	SubFolderReferenceProps,
} from '.';

export interface CtaButtonProps {
	_type: 'cta-button-document';
	_id: string;
	label: ContentBlockProps['value'];
	slugCollection?: {
		slug: string;
		deepLink?: string;
		subFolderReference: SubFolderReferenceProps;
	};
	categories: {
		_type: 'category';
		slug: string;
	}[];
}

interface categoryProps {
	title: string;
	ctaButtonCollection: CtaButtonProps[];
}

export interface CtaButtonCollectionProps {
	ctaButtonCollection: CtaButtonProps[] | categoryProps[];
}

const ctaButtonCollectionProjection = (): string => {
	return `{
		_id,
		_type,
		${customBlockQuery({ name: 'label' })},
		"slugCollection": select(
			defined(href) => {
				"slug": href,
			},
			${internalPageReferenceInSelectQuery()},
		),
		"categories": *[_type == 'theme-page' && references(^._id)]{
			"slug": slug.current,
		},
	}`;
};

export const ctaButtonCollectionQuery = (): string => {
	return `ctaButtonCollection[]{
		_type == 'ctaButton' => @->${ctaButtonCollectionProjection()},
		_type == 'category' => @{
			_type,
			title,
			ctaButtonCollection[]->${ctaButtonCollectionProjection()},
		}
	}`;
};
