import { PictureProps } from '@design-system/components/Picture';
import { pictureQuery } from '.';

export interface VideoProps {
	type: 'video';
	internalVideoUrl: string;
	showInternalVideo?: boolean;
	subtitle?: string;
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
		showInternalVideo,
		internalVideoUrl,
		subtitle,
		url,
		${pictureQuery({})},
	}`;
};
