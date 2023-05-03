import { defineType, defineField } from 'sanity';
import { BiLinkAlt } from 'react-icons/bi';

export default defineType({
	title: 'Knop',
	name: 'flexibleButton',
	type: 'object',
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'string',
			// validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Interne link',
			description: 'Creëert een interne link naar een andere pagina.',
			name: 'pageReference',
			type: 'pageSourceSelector',
			readOnly: ({ parent }) => !!parent?.href,
		}),
		defineField({
			title: 'href',
			name: 'href',
			type: 'string',
			readOnly: ({ parent }) => !!parent?.pageReference,
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
					{
						title: 'Quinary',
						value: 'quinary',
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
	preview: {
		select: {
			title: 'label',
		},
		prepare({ title }) {
			return {
				title: title,
				media: BiLinkAlt,
			};
		},
	},
});
