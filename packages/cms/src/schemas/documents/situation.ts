export default {
	title: 'Situatie document',
	name: 'situation-document',
	type: 'document',
	fieldsets: [
		{
			name: 'protectedContent',
			title: 'Beschermd content',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
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
			title: 'Quarantaine plan titel',
			name: 'quarantinePlanTitle',
			type: 'localeString',
		},
		{
			title: 'Quarantaine plan',
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
		{
			title: 'Beschermd-vraag tonen?',
			name: 'showProtected',
			type: 'boolean',
		},
		{
			title: 'Beschermd header title',
			name: 'beschermdTitle',
			type: 'localeString',
			fieldset: 'protectedContent',
		},
		{
			title: 'Beschermd text',
			name: 'beschermdText',
			type: 'localeBlock',
			fieldset: 'protectedContent',
		},
		{
			title: 'Datum-vraag tonen?',
			name: 'showDate',
			type: 'boolean',
		},
		{
			title: 'Datum-vraag header',
			name: 'dateHeader',
			type: 'header',
		},
	],
};
