import { defineField, defineType } from 'sanity';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'Meer info',
	name: 'moreInfo',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
			description:
				'Indien titel leeg word gelaten wordt `Meer Info` in siteSettings getoond',
		}),
		defineField({
			title: 'Selecteer items',
			name: 'items',
			type: 'array',
			of: [
				defineField({
					title: 'Pagina referentie',
					name: 'genericPageReference',
					type: 'reference',
					to: [{ type: 'generic-page' }],
					options: {
						filter: filterReferenceByLanguage,
					},
				}),
			],
		}),
	],
});
