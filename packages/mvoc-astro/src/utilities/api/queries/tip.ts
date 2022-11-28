import { Locale } from 'src/utilities/locale/translation';
import { localePropertyQuery, imageQuery, ImageProps } from './';

export interface TipProps {
	title: string;
	icon: ImageProps;
	slug: string;
}

export interface TipCollectionProps {
	tipCollection: TipProps[];
}

export const tipsCollectionQuery = ({
	path,
	locale,
}: {
	path?: string;
	locale: Locale;
}): string => {
	return `"tipCollection": ${path ? `${path}.` : ''}tipCollection[]{
		${localePropertyQuery({
			name: 'title',
			path: 'tipReference->header.title',
			locale,
		})},
		${imageQuery({ name: 'icon', path: 'tipReference->header.image' })},
		"slug": tipReference->slug.current,
	}`;
};
