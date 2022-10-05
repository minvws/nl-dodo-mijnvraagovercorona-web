import { Locale } from 'src/utilities/locale/translation';
import { followModals } from './';

export const localePropertyQuery = ({
	name,
	path,
	array,
	locale,
	block,
}: {
	name: string;
	path?: string;
	array?: boolean;
	locale: Locale;
	block?: boolean;
}): string => {
	if (block) {
		if (array) {
			return `"${name}": ${path || name}[]{
				"nl": nl[]${followModals('nl')},
				"en": en[]${followModals('en')}
			}`;
		}

		return `"${name}": ${path || name}.${locale.id}[]${followModals(
			locale.id,
		)}`;
	}

	return `"${name}": ${path || name}${array ? '[]' : ''}.${locale.id}`;
};
