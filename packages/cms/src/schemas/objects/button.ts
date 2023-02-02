import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Button',
	name: 'button',
	type: 'object',
	preview: {
		select: {
			title: 'label.nl',
			subtitle: 'pretitle.nl',
			media: 'image',
		},
	},
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'localeString',
		}),
		defineField({
			title: 'URL',
			name: 'href',
			type: 'localeString',
		}),
		defineField({
			title: 'Externe link?',
			name: 'external',
			type: 'boolean',
			initialValue: true,
		}),
		defineField({
			title: 'Variant',
			name: 'variant',
			type: 'string',
			initialValue: 'button',
			options: {
				layout: 'dropdown',
				list: [
					{
						title: 'Primary',
						value: 'button',
					},
					{
						title: 'Secondary',
						value: 'button-secondary',
					},
					{
						title: 'Tertiary',
						value: 'button-tertiary',
					},
					{
						title: 'Play Store',
						value: 'play-store',
					},
					{
						title: 'App Store',
						value: 'app-store',
					},
				],
			},
		}),
	],
});
