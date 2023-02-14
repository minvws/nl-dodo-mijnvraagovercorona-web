import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Knop',
	name: 'flexibleButton',
	type: 'object',
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		// TODO: add internal link selector
		defineField({
			title: 'href',
			name: 'href',
			type: 'string',
		}),
		defineField({
			title: 'Variant',
			name: 'variant',
			type: 'string',
			initialValue: 'primary',
			options: {
				layout: 'dropdown',
				list: [
					{
						title: 'Primary',
						value: 'primary',
					},
					{
						title: 'Secondary',
						value: 'secondary',
					},
					{
						title: 'Tertiary',
						value: 'tertiary',
					},
					{
						title: 'Quaternary',
						value: 'quaternary',
					},
				],
			},
		}),
		defineField({
			title: 'Icoon',
			name: 'icon',
			type: 'iconPicker',
		}),
	],
	options: {
		collapsible: true,
		collapsed: false,
	},
});
