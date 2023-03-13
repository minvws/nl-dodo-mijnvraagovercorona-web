import {
	PictureProps,
	pictureQuery,
	MultiContentBlocksProps,
	multiContentBlocksQuery,
} from '.';

export interface Tale {
	title: string;
	picture?: PictureProps;
	multiContentBlocks: MultiContentBlocksProps;
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
