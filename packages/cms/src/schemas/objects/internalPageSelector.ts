import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Link naar interne pagina',
	name: 'internalPageSelector',
	type: 'array',
	of: [
		{
			title: 'Overzicht',
			name: 'pageOverview',
			type: 'object',
			fields: [
				{
					title: 'Label',
					name: 'label',
					type: 'customBlock',
				},
				{
					title: 'Pagina referentie',
					name: 'pageReference',
					type: 'reference',
					to: [
						{ type: 'situation-question-document' },
						{ type: 'situation-result-document' },
						{ type: 'tip-document' },
						{ type: 'theme-document' },
					],
				},
			],
			preview: {
				select: {
					title: 'label',
					referenceTitle: 'pageReference.header.title.nl',
					slug: 'pageReference.slug.current',
				},
				prepare(selection) {
					const { title, referenceTitle, slug } = selection;
					return {
						title: referenceTitle || title,
						subtitle: slug,
					};
				},
			},
		},
	],
});
