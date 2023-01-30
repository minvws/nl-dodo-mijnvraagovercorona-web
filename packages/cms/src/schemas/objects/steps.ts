import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Stappen',
	name: 'steps',
	type: 'array',
	of: [
		{
			type: 'object',
			preview: {
				select: {
					title: 'title.nl',
				},
			},
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
					title: 'Punten',
					name: 'points',
					type: 'array',
					of: [
						{
							type: 'object',
							preview: {
								select: {
									title: 'title.nl',
								},
							},
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
							],
						},
					],
				}),
			],
		},
	],
});
