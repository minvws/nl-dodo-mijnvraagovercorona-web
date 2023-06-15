import { ContentBlockProps } from '@design-system/components/ContentBlock';
import {
	customBlockQuery,
	internalPageReferenceInSelectQuery,
	SubFolderReferenceProps,
} from '.';
import { stringToSlug } from 'src/utilities/stringToSlug';

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

export const getFiltersAndSituations = ({
	ctaButtonCollection,
}: CtaButtonCollectionProps) => {
	const filters = [];
	const ctaButtons = [];

	// Separate the categories from the ctaButtons
	ctaButtonCollection.forEach((item) => {
		if (item._type === 'category') {
			const categorySlug = stringToSlug(item.title);
			// add category to filters array
			filters.push({ label: item.title, id: categorySlug });

			// loop over connected ctaButtons to add them to our ctabuttons array and
			item.ctaButtonCollection.forEach((button) => {
				// check if button is already present in our ctaButton array and store the index
				const foundButtonIndex = ctaButtons.findIndex(
					(ctaButton) => ctaButton._id === button._id,
				);

				if (foundButtonIndex < 0) {
					// add item to ctaButtons with category
					if (
						button.categories.findIndex((cat) => cat.slug === categorySlug) ===
						-1
					) {
						button.categories.push({
							slug: categorySlug,
						});
					}
					ctaButtons.push(button);
				} else {
					// button is found, only update categories
					if (
						ctaButtons[foundButtonIndex].categories.findIndex(
							(cat) => cat.slug === categorySlug,
						) === -1
					) {
						ctaButtons[foundButtonIndex].categories.push({
							slug: categorySlug,
						});
					}
				}
			});
		} else if (item._type === 'cta-button-document') {
			ctaButtons.push(item);
		}
	});

	return {
		filters,
		ctaButtons,
	};
};
