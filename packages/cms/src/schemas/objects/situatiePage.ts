import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Situatie Pagina',
	name: 'situatiePage',
	type: 'document',
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		}),
		defineField({
			title: 'Header',
			name: 'header',
			type: 'header',
		}),
		defineField({
			title: 'Voorloper titel',
			name: 'pretitle',
			type: 'localeString',
		}),
		defineField({
			title: 'Quarantaine plan titel',
			name: 'quarantinePlanTitle',
			type: 'localeString',
		}),
		defineField({
			title: 'Quarantaine plan',
			name: 'quarantinePlan',
			type: 'quarantinePlan',
		}),
		defineField({
			title: 'Toon print & agenda',
			name: 'showPrintAndCalendar',
			type: 'boolean',
		}),
		defineField({
			title: 'Duur quarantaine',
			name: 'quarantaineDuration',
			type: 'number',
		}),
		defineField({
			title: 'Maximaal aantal dagen waarna geen advies mogelijk is',
			name: 'maxDays',
			type: 'number',
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'string',
		}),
	],
});
