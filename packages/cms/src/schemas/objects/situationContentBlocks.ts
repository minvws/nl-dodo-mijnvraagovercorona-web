import { BiLinkAlt } from 'react-icons/bi';
import { BsCardText, BsCardImage, BsCameraVideo } from 'react-icons/bs';
import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Content',
	name: 'contentBlocks',
	type: 'array',
	of: [
		{
			title: 'Situatiebutton',
			name: 'situation',
			type: 'object',
			icon: BiLinkAlt,
			preview: {
				select: {
					title: 'situationReference.slug.current',
				},
			},
			initialValue: {
				variant: 'button',
			},
			fields: [
				defineField({
					title: 'Link titel',
					name: 'situationLinkTitle',
					type: 'localeString',
				}),
				defineField({
					title: 'Variant',
					name: 'variant',
					type: 'string',
					options: {
						list: ['button', 'button-tertiary'],
					},
				}),
				defineField({
					title: 'Link naar situatiepagina',
					name: 'situationReference',
					type: 'reference',
					to: [
						{ type: 'situation-question-document' },
						{ type: 'situation-result-document' },
					],
				}),
			],
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
			icon: BsCardText,
		},
		{
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
			icon: BsCardImage,
		},
		{
			title: 'Video',
			name: 'video',
			type: 'video',
			icon: BsCameraVideo,
		},
	],
});
