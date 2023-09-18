import {
	ImageProps,
	MultiContentBlocksProps,
	SubFolderReferenceProps,
	imageQuery,
	internalPageReferenceInSelectQuery,
	multiContentBlocksQuery,
} from '.';

export interface CarouselItemProps {
	id?: string | undefined | null;
	headline: string;
	image?: ImageProps;
	openItem?: string;
	slugCollection?: {
		slug: string;
		deepLink?: string;
		subFolderReference: SubFolderReferenceProps;
		asset?: string;
	};
	multiContentBlocks?: MultiContentBlocksProps;
}

export interface CarouselProps {
	title: string;
	carouselItems: CarouselItemProps[];
}

export const carouselQuery = (): string => {
	return `carousel{
		title,
		carouselItems[]->{
			"id": _id,
			headline,
			${imageQuery({
				name: 'image',
			})},
			openItem,
			"slugCollection": select(
				${internalPageReferenceInSelectQuery()},
				asset._type match "file" => {
					"asset": "/assets/sanity/" + asset.asset->sha1hash + "-" + asset.asset->originalFilename,
				},
				{
					"slug": href
				},
			),
			${multiContentBlocksQuery()},
		},
	}`;
};
