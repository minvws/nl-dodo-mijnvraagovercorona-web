import {
	PictureProps,
	pictureQuery,
	MultiContentBlocksProps,
	multiContentBlocksQuery,
} from '.';
import { ImageProps, imageQuery } from '../image';

export interface Tale {
	title: string;
	picture?: PictureProps;
	multiContentBlocks: MultiContentBlocksProps;
	overview: {
		title: string;
		icon: ImageProps;
	};
}

export interface TaleCollectionProps {
	taleCollection: Tale[];
}

export const taleReferenceQuery = (): string => {
	return `taleCollection[]->{
		title,
		${pictureQuery({})},
		${multiContentBlocksQuery()},
		overview{
			title,
			${imageQuery({ name: 'icon' })},
		},
	}`;
};
