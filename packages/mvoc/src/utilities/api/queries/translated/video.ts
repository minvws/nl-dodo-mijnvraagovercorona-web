export interface VideoProps {
	type: 'video';
	url: string;
	title: string;
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

export const videoQuery = ({
	omitProperty = false,
}: {
	omitProperty?: boolean;
}): string => {
	return `${omitProperty ? '' : `video`}{
		"type": _type,
		title,
		url,
		image{
			"src": "/images/sanity/" + asset->sha1hash + "-" + asset->originalFilename,
			"metaData": asset->metadata
		},
	}`;
};
