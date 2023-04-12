import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Kaarten',
	name: 'card',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	preview: {
		select: {
			title: 'title',
			subtitle: '__i18n_lang',
		},
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Chapeau',
			name: 'chapeau',
			type: 'string',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		}),
		defineField({
			title: 'Knoppen',
			name: 'buttons',
			type: 'array',
			validation: (Rule) => Rule.min(1).max(2),
			of: [
				defineField({
					title: 'Knop',
					name: 'button',
					type: 'flexibleButton',
				}),
			],
		}),
	],
});
