import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Content Card',
	name: 'content-card-document',
	type: 'document',
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'chapeau.nl',
		},
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Chapeau',
			name: 'chapeau',
			type: 'localeString',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		}),
		defineField({
			title: 'Onthulling',
			name: 'disclosure',
			type: 'disclosure',
		}),
		defineField({
			title: 'Tips',
			name: 'tipCollection',
			type: 'tipSelector',
		}),
		defineField({
			title: 'Buttons',
			name: 'buttons',
			type: 'array',
			of: [
				{
					title: 'Button',
					name: 'button',
					type: 'object',
					fields: [
						defineField({
							title: 'Text',
							name: 'text',
							type: 'localeString',
						}),
						defineField({
							title: 'Situatie',
							name: 'situation',
							type: 'reference',
							to: [
								{ type: 'situation-question-document' },
								{ type: 'situation-result-document' },
							],
						}),
						defineField({
							title: 'Link',
							name: 'link',
							type: 'localeString',
						}),
					],
					preview: {
						select: {
							title: 'text.nl',
						},
					},
				},
			],
		}),
	],
});
