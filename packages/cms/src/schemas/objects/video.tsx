import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';

type PreviewProps = { value: { url: string } };

const Preview: React.FC<PreviewProps> = ({ value }) => {
	const { url } = value;
	const id = getYouTubeId(url);
	return (
		<>
			<YouTube className="aspect-ratio" videoId={id || undefined} />
			<style>{`
				.aspect-ratio > iframe {
					inline-size: 100%;
					block-size: auto;
					aspect-ratio: 16/9;
				}
			`}</style>
		</>
	);
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
