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
	picture?: PictureProps;
	multiContentBlocks: MultiContentBlocksProps;
	anchorable?: boolean;
}

export interface TaleCollectionProps {
	taleCollection: Tale[];
}

export const taleReferenceQuery = (): string => {
	return `taleCollection[]->{
		title,
		${pictureQuery({})},
		${multiContentBlocksQuery()},
	}`;
};
