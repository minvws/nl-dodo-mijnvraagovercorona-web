import {
	MultiContentBlocksProps,
	multiContentBlocksQuery,
} from './multiContentBlock';
import { PictureProps, pictureQuery } from './picture';

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
