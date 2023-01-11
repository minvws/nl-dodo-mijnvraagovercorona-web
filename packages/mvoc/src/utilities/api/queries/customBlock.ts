import { Locale } from 'src/utilities/locale/translation';
import { followModals } from '.';

export const customBlockQuery = ({
	name,
	locale,
}: {
	name: string;
	locale: Locale;
}): string => `${name}[]${followModals(locale.id)}`;
