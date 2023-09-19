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
			"src": "/assets/sanity/" + asset->sha1hash + "." + asset->extension,
			"metaData": asset->metadata
		},
	}`;
};
