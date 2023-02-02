import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Vraag startpunten',
	name: 'questionSelector',
	type: 'array',
	of: [
		{
			title: 'Vraag overzicht',
			name: 'questionOverview',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'localeBlock',
				}),
				defineField({
					title: 'Vraag referentie',
					name: 'situationReference',
					type: 'reference',
					to: [
						{ type: 'situation-question-document' },
						{ type: 'situation-result-document' },
						{ type: 'tip-document' },
					],
				}),
			],
			preview: {
				select: {
					title: 'title.nl',
					subtitle: 'situationReference.slug.current',
				},
			},
		},
	],
});
