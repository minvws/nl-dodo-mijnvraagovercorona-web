import { Locale, prefixUrlWithlocale } from '../locale/translation';
import { isExternalUrl } from './external-url';

export const parseLink = (href: string, locale: Locale): string => {
	if (isExternalUrl(href)) {
		href += (href.includes('?') ? '&' : '?') + 'utm_source=mijnvraagovercorona';
	}
	return prefixUrlWithlocale(href, locale);
};
