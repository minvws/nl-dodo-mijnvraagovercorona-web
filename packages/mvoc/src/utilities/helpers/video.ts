const getYouTubeVideoDataFromUrl = ({
	url,
}: {
	url: string;
}): { platform: string; id: string } | undefined => {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	//Return the result
	return match && match[2].length === 11
		? { platform: 'youtube', id: match[2] }
		: undefined;
};

const getVimeoVideoDataFromUrl = ({
	url,
}: {
	url: string;
}): { platform: string; id: string } | undefined => {
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
}: {
	url: string;
}): { platform: string; id: string } | undefined =>
	getYouTubeVideoDataFromUrl({ url }) || getVimeoVideoDataFromUrl({ url });

const generateYouTubeUrl = (id: string): string => {
	return `//www.youtube.com/embed/${id}?autoplay=0&autohide=1&showinfo=0&modestbranding=1&controls=0&mute=0&rel=0&enablejsapi=1`;
};
const generateVimeoUrl = (id: string): string => {
	return `https://player.vimeo.com/video/${id}?&autoplay=0&loop=1&title=0&byline=0&portrait=0&muted=1&#t=235s`;
};

export const getVideoEmbedUrl = ({
	url,
}: {
	url: string;
}): string | undefined => {
	const videoData = destructureVideoUrl({ url });
	return videoData.platform === 'youtube'
		? generateYouTubeUrl(videoData.id)
		: videoData.platform === 'vimeo'
		? generateVimeoUrl(videoData.id)
		: undefined;
};
