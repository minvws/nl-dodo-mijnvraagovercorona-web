import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Advice Card',
	name: 'adviceCard',
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
			type: 'string',
		}),
		defineField({
			title: 'Subtitle',
			name: 'subTitle',
			type: 'string',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		}),
	],
});
