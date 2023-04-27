import {
	SubFolderReferenceProps,
	subFolderReferenceQuery,
	ImageProps,
	imageQuery,
} from '.';

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
