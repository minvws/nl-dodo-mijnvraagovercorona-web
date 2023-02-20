import {
	MultiContentBlocksProps,
	multiContentBlocksQuery,
} from './multiContentBlock';

export interface TaleCollectionProps {
	taleCollection: {
		title: string;
		multiContentBlocks: MultiContentBlocksProps;
	}[];
}

export const taleReferenceQuery = (): string => {
	return `taleCollection[]->{
		title,
		${multiContentBlocksQuery()}
	}`;
};
