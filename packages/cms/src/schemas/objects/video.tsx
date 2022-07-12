import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';

type PreviewProps = { value: { url: string } };

const Preview: React.FC<PreviewProps> = ({ value }) => {
	const { url } = value;
	const id = getYouTubeId(url);
	return <YouTube videoId={id || undefined} />;
};

export default {
	title: 'Video',
	name: 'video',
	type: 'object',
	fields: [
		{
			title: 'Video embed URL',
			name: 'url',
			type: 'url',
		},
	],
	preview: {
		select: {
			url: 'url',
		},
		component: Preview,
	},
};
