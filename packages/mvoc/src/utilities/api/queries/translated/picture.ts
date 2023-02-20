export interface PictureProps {
	type: 'picture';
	alt?: string;
	image?: {
		src: string;
		metaData: {
			lqip: string;
			dimensions: {
				aspectRatio: number;
				height: number;
				width: number;
			};
		};
	};
}

export const pictureQuery = ({
	omitProperty = false,
}: {
	omitProperty?: boolean;
}): string => {
	return `${omitProperty ? '' : `picture`}{
		"type": _type,
		alt,
		image{
			"src": "/images/sanity/" + asset->sha1hash + "-" + asset->originalFilename,
			"metaData": asset->metadata
		},
	}`;
};
