export default {
	title: 'Check Situatie Huisgenoot Corona Geen Afstand Wel Klachten Pagina',
	name: 'situatie-huisgenoot-corona-geen-afstand-wel-klachten-page',
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
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
