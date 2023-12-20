export type VideoUrlProps = {
	url: string;
	options?: {
		autoplay?: boolean;
		loop?: boolean;
		controls?: boolean;
		mute?: boolean;
	};
};

const getYouTubeVideoDataFromUrl = ({
	url,
}: VideoUrlProps): { platform: string; id: string } | undefined => {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	//Return the result
	return match && match[2].length === 11
		? { platform: 'youtube', id: match[2] }
		: undefined;
};

const getVimeoVideoDataFromUrl = ({
	url,
}: VideoUrlProps): { platform: string; id: string } | undefined => {
	const match = /vimeo.*\/(\d+)/i.exec(url);

	return match && match[1]
		? {
				platform: 'vimeo',
				id: match[1],
		  }
		: undefined;
};

const destructureVideoUrl = ({
	url,
}: VideoUrlProps): { platform: string; id: string } | undefined =>
	getYouTubeVideoDataFromUrl({ url }) || getVimeoVideoDataFromUrl({ url });

const generateYouTubeUrl = ({
	id,
	options,
}: {
	id: string;
	options?: VideoUrlProps['options'];
}): string => {
	return `//www.youtube.com/embed/${id}?autoplay=${
		options?.autoplay ? '1' : '0'
	}&loop=${
		options?.loop ? '1' : '0'
	}&autohide=1&showinfo=0&modestbranding=1&controls=${
		options?.controls ? '1' : '0'
	}&mute=${options?.mute ? '1' : '0'}&rel=0&enablejsapi=1`;
};
const generateVimeoUrl = ({
	id,
	options,
}: {
	id: string;
	options?: VideoUrlProps['options'];
}): string => {
	return `https://player.vimeo.com/video/${id}?&autoplay=${
		options?.autoplay ? '1' : '0'
	}&loop=${options?.loop ? '1' : '0'}&title=0&byline=0&portrait=0&muted=${
		options?.mute ? '1' : '0'
	}`;
};

export const getVideoEmbedUrl = ({
	url,
	options,
}: VideoUrlProps): string | undefined => {
	if (!url) {
		return undefined;
	}

	const videoData = destructureVideoUrl({ url });

	if (!videoData) {
		return undefined;
	}

	if (videoData.platform === 'youtube') {
		return generateYouTubeUrl({ id: videoData.id, options });
	} else if (videoData.platform === 'vimeo') {
		return generateVimeoUrl({ id: videoData.id, options });
	}

	return undefined;
};
