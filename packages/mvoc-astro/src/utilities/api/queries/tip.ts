import { Locale } from 'src/utilities/locale/translation';
import { localePropertyQuery, imageQuery } from './';

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
