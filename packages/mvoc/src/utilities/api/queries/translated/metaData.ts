import { ImageProps, imageQuery } from '../';

export interface MetaDataProps {
	title: string;
	description: 'string';
	image: ImageProps;
	noIndex?: boolean;
}

export const metaDataQuery = (): string => {
	return `metaData{
			title,
			description,
			${imageQuery({
				name: 'image',
				path: 'socialShareImage',
			})},
			noIndex
	}`;
};
