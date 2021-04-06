export default {
	title: 'Check Situatie Corona Met Klachten Pagina',
	name: 'situatie-corona-met-klachten-page',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'header',
		},
		{
			title: 'Voorloper titel',
			name: 'pretitle',
			type: 'localeString',
		},
		{
			title: 'Quarantaine Plan',
			name: 'quarantinePlan',
			type: 'quarantinePlan',
		},
		{
			title: 'Toon print & agenda',
			name: 'showPrintAndCalendar',
			type: 'boolean',
		},
		{
			title: 'Duur quarantaine',
			name: 'quarantaineDuration',
			type: 'number',
		},
		{
			title: 'Maximaal aantal dagen waarna geen advies mogelijk is',
			name: 'maxDays',
			type: 'number',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
