import { PictureProps as PicturePropsElement } from '@design-system/components/Picture';

export interface PictureProps extends PicturePropsElement {}

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
