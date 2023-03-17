import { defineField, defineType } from 'sanity';

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
				defineField({
					title: 'Label',
					name: 'label',
					type: 'customBlock',
				}),
				defineField({
					title: 'Pagina referentie',
					name: 'pageReference',
					type: 'pageReference',
				}),
			],
			preview: {
				select: {
					title: 'label',
					referenceTitle: 'pageReference.metaData.title',
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
});
