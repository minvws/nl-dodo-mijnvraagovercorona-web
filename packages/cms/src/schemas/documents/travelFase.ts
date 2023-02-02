import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Reis Fase Documenten',
	name: 'travel-fase-document',
	type: 'document',
	fields: [
		defineField({
			title: 'Naam',
			name: 'name',
			type: 'string',
		}),
		defineField({
			title: 'Label',
			name: 'label',
			type: 'string',
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'label',
		},
	},
});
