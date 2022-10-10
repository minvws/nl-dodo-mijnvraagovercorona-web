import { Locale } from 'src/utilities/locale/translation';
import { localePropertyQuery, ImageProps, imageQuery } from './';

export interface MetaDataProps {
	title: string;
	description: 'string';
	image: ImageProps;
}

export const metaDataQuery = ({ locale }: { locale: Locale }): string => {
	return `"metaData": {
		${localePropertyQuery({ name: 'title', path: 'metaData.title', locale })},
		${localePropertyQuery({
			name: 'description',
			path: 'metaData.description',
			locale,
		})},
		${imageQuery({
			name: 'image',
			path: 'metaData.socialShareImage',
		})},
	}`;
};
