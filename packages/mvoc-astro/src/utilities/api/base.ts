/**
 * This helper function will transfer modals into content
 */
const followModals = (locale: string) => `{
	...,
	markDefs[]{
		...,
		_type == "dialog" => {
			"title": @.modal_ref->title.${locale},
			${getImage({ name: 'image', path: '@.modal_ref->image', full: true })},
			"content": @.modal_ref->content.${locale},
		}
	},
}`;

export const getLocaleProperty = ({
	name,
	path,
	array,
	locale,
	block,
}: {
	name: string;
	path?: string;
	array?: boolean;
	locale: string;
	block?: boolean;
}): string => {
	if (block) {
		if (array) {
			return `"${name}": ${path || name}[]{
				"nl": nl[]${followModals('nl')},
				"en": en[]${followModals('en')}
			}`;
		}

		return `"${name}": ${path || name}.${locale}[]${followModals(locale)}`;
	}

	return `"${name}": ${path || name}${array ? '[]' : ''}.${locale}`;
};

export interface SanityImageProps {
	src?: string;
	dimensions: {
		aspectRatio?: number;
		width?: number;
		height?: number;
	};
}

/**
 * This helper function allows us to get the unique file name of a sanity image
 */
export const getImage = ({
	name,
	path,
}: {
	name: string;
	path?: string;
}): string => {
	return `"${name}": {
			"src": "/images/sanity/" + ${path || name}.asset->sha1hash + "-" + ${
		path || name
	}.asset->originalFilename,
			"dimensions": {
				"aspectRatio": ${path || name}.asset->metadata.dimensions.aspectRatio,
				"width": ${path || name}.asset->metadata.dimensions.width,
				"height": ${path || name}.asset->metadata.dimensions.height,
			},
		}`;
};
