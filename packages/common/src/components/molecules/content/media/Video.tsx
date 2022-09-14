/** @jsxImportSource theme-ui */
import React from 'react';
import { jsx, Box, Image } from 'theme-ui';
import {
	SanityImageFullProps,
	useSanitySiteSettings,
} from '@quarantaine/common';
import VisuallyHidden from '@reach/visually-hidden';

type OwnProps = {
	title: string;
	url: string;
	image: SanityImageFullProps;
};

export const Video: React.FC<OwnProps> = ({ title, url, image }) => {
	const siteSettings = useSanitySiteSettings();
	return (
		<a
			href={url}
			sx={{
				position: 'relative',
				display: 'block',
				color: 'white',
				transition: '300ms ease-in-out',
				'&::after': {
					position: 'absolute',
					insetBlock: 0,
					insetInline: 0,
					backgroundImage:
						'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
					content: '""',
				},
				':focus, :hover': {
					color: 'secondary',
				},
			}}
			target="_blank"
			rel="noopener noreferrer"
		>
			<Image
				src={image.src}
				alt=""
				sx={{
					display: 'block',
					inlineSize: '100%',
					blockSize: 'auto',
					aspectRatio: '16/9',
					objectFit: 'cover',
				}}
				loading="lazy"
			/>
			<svg
				sx={{
					position: 'absolute',
					insetBlock: '50%',
					insetInline: '50%',
					transform: 'translate(-50%, -50%)',
					inlineSize: '25%',
					aspectRatio: '1/1',
					zIndex: 1,
				}}
				viewBox="0 0 144 144"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M140.191 71.753c0 37.757-30.607 68.365-68.364 68.365-37.756 0-68.364-30.608-68.364-68.365 0-37.757 30.608-68.365 68.364-68.365 37.757 0 68.364 30.608 68.364 68.365Z"
					stroke="currentcolor"
					strokeWidth="6"
				/>
				<path
					d="M113.845 72.419 51.819 108.23V36.607l62.026 35.812Z"
					fill="currentcolor"
				/>
			</svg>
			<VisuallyHidden>
				{title}({siteSettings.accessibility.labelExternalLink})
			</VisuallyHidden>
		</a>
	);
};
