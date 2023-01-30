import { defineType, defineField } from 'sanity'

export default defineType({	title: 'Risico Categorie Documenten',
	name: 'risk-category-document',
	type: 'document',
	fields: [
		{
			title: 'Naam',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Label',
			name: 'label',
			type: 'string',
		},
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'label',
		},
	},
});