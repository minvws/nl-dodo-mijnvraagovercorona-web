export default {
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
						{ type: 'generic-page' },
					],
				},
			],
			preview: {
				select: {
					title: 'label',
					referenceTitle: 'pageReference.header.title',
					slug: 'pageReference.slug.current',
				},
				prepare(selection) {
					const { title, referenceTitle, slug } = selection;
					return {
						title:
							typeof referenceTitle === 'object'
								? referenceTitle.nl
								: referenceTitle || title,
						subtitle: slug,
					};
				},
			},
		},
	],
};
