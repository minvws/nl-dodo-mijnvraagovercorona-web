import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Advice Block',
	name: 'adviceBlock',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true,
	},
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
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Items',
			name: 'items',
			type: 'array',
			of: [
				defineField({
					title: 'item',
					name: 'item',
					type: 'object',
					fields: [
						defineField({
							title: 'Titel',
							name: 'label',
							type: 'string',
						}),
						defineField({
							title: 'Content',
							name: 'content',
							type: 'customBlock',
						}),
						defineField({
							title: 'Afbeelding',
							name: 'image',
							type: 'image',
						}),
					],
				}),
			],
		}),
		defineField({
			title: 'Button',
			name: 'button',
			type: 'flexibleButton',
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),
	],
});
