import { PictureProps } from "@design-system/components/Picture";
import { pictureQuery } from "./picture";

export interface VideoProps {
	type: 'video';
	url: string;
	title: string;
	picture?: PictureProps;
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
		${pictureQuery({})},
	}`;
};
