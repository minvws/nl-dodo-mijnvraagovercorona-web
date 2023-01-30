import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Hulp',
	name: 'aid',
	type: 'object',
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		}),
		defineField({
			title: 'Adviezen',
			name: 'advice',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							title: 'Titel',
							name: 'title',
							type: 'localeString',
						}),
						defineField({
							title: 'Subtitel',
							name: 'subtitle',
							type: 'localeString',
						}),
						defineField({
							title: 'Icoon',
							name: 'icon',
							type: 'image',
						}),
					],
					preview: {
						select: {
							title: 'title.nl',
							subtitle: 'subtitle.nl',
							media: 'icon',
						},
					},
				},
			],
		}),
	],
});
