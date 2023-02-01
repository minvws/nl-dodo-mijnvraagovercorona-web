import { defineType, defineField } from 'sanity'

export default defineType({
	title: 'Modals',
	name: 'modals',
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
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlockWithoutModal',
		}),
	],
});
