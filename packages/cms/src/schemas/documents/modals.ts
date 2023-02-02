import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Modals',
	name: 'modals-document',
	type: 'document',
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
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'localeBlockWithoutModal',
		}),
	],
});
