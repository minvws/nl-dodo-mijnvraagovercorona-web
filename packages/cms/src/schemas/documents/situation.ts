export default {
	title: 'Situatie document',
	name: 'situation-document',
	type: 'document',
	fieldsets: [
		{
			name: 'exceptionContent',
			title: 'Uitgezonderd content',
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
			title: 'Informeer Contacten',
			name: 'informContactsReference',
			type: 'reference',
			to: [{ type: 'inform-contacts-document' }],
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
			title: 'Uitzonderingenvraag tonen?',
			name: 'showExceptions',
			type: 'boolean',
		},
		{
			title: 'Uitgezonderd header title',
			name: 'uitgezonderdTitle',
			type: 'localeString',
			fieldset: 'exceptionContent',
		},
		{
			title: 'Uitgezonderd text',
			name: 'uitgezonderdText',
			type: 'localeBlock',
			fieldset: 'exceptionContent',
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
		{
			title: 'Informeer contacten tonen?',
			name: 'showInformContacts',
			type: 'boolean',
		},
	],
};
