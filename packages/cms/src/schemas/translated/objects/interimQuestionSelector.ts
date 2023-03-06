import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Vraag startpunten',
	name: 'interimQuestionSelector',
	type: 'array',
	of: [
		{
			title: 'Vraag overzicht',
			name: 'questionOverview',
			type: 'object',
			fields: [
				defineField({
					title: 'Label',
					name: 'label',
					type: 'customBlock',
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
					title: 'label',
					subtitle: 'situationReference.slug.current',
				},
			},
		},
	],
});
