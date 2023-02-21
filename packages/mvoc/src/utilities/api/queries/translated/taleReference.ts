import {
	MultiContentBlocksProps,
	multiContentBlocksQuery,
} from './multiContentBlock';
import { PictureProps, pictureQuery } from './picture';

export interface TaleCollectionProps {
	taleCollection: {
		title: string;
		picture?: PictureProps;
		multiContentBlocks: MultiContentBlocksProps;
	}[];
}

export const taleReferenceQuery = (): string => {
	return `taleCollection[]->{
		title,
		${pictureQuery({})},
		${multiContentBlocksQuery()},
	}`;
};
