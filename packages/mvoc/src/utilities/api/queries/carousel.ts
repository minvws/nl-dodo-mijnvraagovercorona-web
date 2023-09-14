import {
	ImageProps,
	MultiContentBlocksProps,
	imageQuery,
	multiContentBlocksQuery,
} from '.';

export interface CarouselItemProps {
	title: string;
	id: string;
	image?: ImageProps;
	openItem?: string;
	multiContentBlocks: MultiContentBlocksProps;
}

export interface CarouselProps {
	title: string;
	carouselItems: CarouselItemProps[];
}

export const carouselQuery = (): string => {
	return `carousel{
		title,
		carouselItems[]->{
		title,
		openItem,
		"id": _id,
		${imageQuery({
			name: 'image',
		})},
		${multiContentBlocksQuery()},
		},
	}`;
};
