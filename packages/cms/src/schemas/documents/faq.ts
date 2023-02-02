import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'FAQ Documenten',
	name: 'faq-document',
	type: 'document',
	fields: [
		defineField({
			title: 'Referentie',
			name: 'reference',
			type: 'string',
		}),
		defineField({
			title: 'Reisfase',
			name: 'reisfase',
			type: 'string',
			options: {
				list: [
					{
						title: 'Voorbereiding',
						value: 'voorbereiding',
					},
					{
						title: 'Tijdens de reis',
						value: 'tijdensDeReis',
					},
					{
						title: 'Thuiskomst',
						value: 'thuiskomst',
					},
				],
			},
		}),
		defineField({
			title: 'Vraag',
			name: 'vraag',
			type: 'localeString',
		}),
		defineField({
			title: 'Antwoord',
			name: 'antwoord',
			type: 'localeBlock',
		}),
		defineField({
			title: 'Volgorde',
			name: 'order',
			type: 'number',
			hidden: true,
		}),
	],
	orderings: [
		{
			title: 'Volgorde',
			name: 'order',
			by: [{ field: 'order', direction: 'asc' }],
		},
	],
	preview: {
		select: {
			title: 'vraag.nl',
			subtitle: 'antwoord.nl',
		},
	},
});
