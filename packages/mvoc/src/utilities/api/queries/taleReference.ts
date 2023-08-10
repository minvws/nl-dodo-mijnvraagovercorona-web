import {
	PictureProps,
	pictureQuery,
	MultiContentBlocksProps,
	multiContentBlocksQuery,
	ImageProps,
	imageQuery,
} from '.';

export interface Tale {
	title: string;
	quote?: string;
	readMore?: string;
	readLess?: string;
	picture?: PictureProps;
	multiContentBlocks: MultiContentBlocksProps;
}

export interface TaleCollectionProps {
	taleCollection: Tale[];
}

export const taleReferenceQuery = (): string => {
	return `taleCollection[]->{
		title,
		quote,
		readMore,
		readLess,
		${pictureQuery({})},
		${multiContentBlocksQuery()},
	}`;
};
