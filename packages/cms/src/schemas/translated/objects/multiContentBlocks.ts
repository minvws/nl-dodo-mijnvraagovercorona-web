import { BiLinkAlt } from 'react-icons/bi';
import { BsCardText, BsCardImage, BsCameraVideo } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Content',
	name: 'multiContentBlocks',
	type: 'array',
	of: [
		defineField({
			title: 'Button',
			name: 'button',
			type: 'object',
			icon: BiLinkAlt,
			preview: {
				select: {
					title: 'button.label',
				},
			},
			fields: [
				defineField({
					title: 'Knop',
					name: 'button',
					type: 'flexibleButton',
					icon: BiLinkAlt,
				}),
			],
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'object',
			icon: BsCardText,
			preview: {
				select: {
					title: 'content',
				},
			},
			fields: [
				defineField({
					title: 'Content',
					name: 'content',
					type: 'customBlock',
				}),
			],
		}),
		defineField({
			title: 'Afbeelding',
			name: 'picture',
			type: 'object',
			icon: BsCardImage,
			preview: {
				select: {
					title: 'image.asset.originalFilename',
					media: 'image',
				},
			},
			fields: [
				defineField({
					title: 'Afbeelding',
					name: 'image',
					type: 'image',
					icon: BsCardImage,
				}),
				defineField({
					title: 'ALT attribuut',
					name: 'alt',
					type: 'string',
					description:
						'Beschrijf zo duidelijk mogelijk wat er op de afbeelding te zien is. Laat leeg wanneer de afbeelding puur decoratief is. ',
				}),
			],
		}),
		defineField({
			title: 'Video',
			name: 'video',
			type: 'object',
			icon: BsCameraVideo,
			preview: {
				select: {
					title: 'video.url',
					media: 'video.image',
				},
			},
			fields: [
				defineField({
					title: 'Video',
					name: 'video',
					type: 'video',
					icon: BsCameraVideo,
				}),
			],
		}),
	],
});
