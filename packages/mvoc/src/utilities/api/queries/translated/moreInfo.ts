import { ImageProps, imageQuery } from '../image';

export interface MoreInfoProps {
	title: string;
	items: {
		title: string;
		icon?: ImageProps;
		slug: string;
	}[];
}

export const moreInfoQuery = (): string => {
	return `moreInfo{
		title,
		items[]->{
			"title": hero.title,
			${imageQuery({ name: 'icon', path: 'hero.image' })},
			"slug": slug.current,
a		},
	}`;
};
