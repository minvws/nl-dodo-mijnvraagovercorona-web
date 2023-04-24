import { ImageProps, imageQuery } from '../image';
import { SubFolderReferenceProps } from './subFolderReference';
import { subFolderReferenceQuery } from './subFolderReference';

export interface MoreInfoProps {
	title: string;
	items: {
		title: string;
		icon?: ImageProps;
		slug: string;
		subFolderReference: SubFolderReferenceProps;
	}[];
}

export const moreInfoQuery = (): string => {
	return `moreInfo{
		title,
		items[]->{
			"title": hero.title,
			${imageQuery({ name: 'icon', path: 'hero.image' })},
			"slug": slug.current,
			${subFolderReferenceQuery()},
		},
	}`;
};
