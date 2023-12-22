import type { PictureProps as PicturePropsElement } from '@mvoc/ui/components';

export interface PictureProps extends PicturePropsElement {
	type: 'picture';
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
			"src": "/assets/sanity/" + asset->sha1hash + "." + asset->extension,
			"metaData": asset->metadata
		},
	}`;
};
