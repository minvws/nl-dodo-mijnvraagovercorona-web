import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Header',
	name: 'header',
	type: 'object',
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		},
		{
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		},
		{
			title: 'Modal',
			name: 'modal',
			type: 'object',
			fields: [
				{
					title: 'Link',
					name: 'link',
					type: 'localeString',
				},
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
			],
		},
	],
	options: {
		collapsible: true,
		collapsed: true,
	},
});
