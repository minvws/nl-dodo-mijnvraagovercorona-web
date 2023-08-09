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
	campaign: {
		quote: string;
		buttonLabel: string;
	};
	picture?: PictureProps;
	multiContentBlocks: MultiContentBlocksProps;
}

export interface TaleCollectionProps {
	taleCollection: Tale[];
}

export const taleReferenceQuery = (): string => {
	return `taleCollection[]->{
		title,
		campaign{
			quote,
			buttonLabel,
		},
		quote,
		${pictureQuery({})},
		${multiContentBlocksQuery()},
	}`;
};
