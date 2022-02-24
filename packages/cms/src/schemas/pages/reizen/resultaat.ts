export default {
	title: 'Reizen Resultaat Pagina',
	name: 'resultaat-page',
	type: 'document',
	fields: [
		{
			title: 'Start Datum',
			name: 'startDate',
			type: 'date',
		},
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									title: 'Content',
									name: 'content',
									type: 'localeString',
								},
								{
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								},
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				},
				{
					title: 'Subtitel',
					name: 'subtitle',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									title: 'Content',
									name: 'content',
									type: 'localeString',
								},
								{
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								},
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				},
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			title: 'Reisschema',
			name: 'travelPlan',
			type: 'object',
			fields: [
				{
					title: 'Waarschuwing Regelwijziging',
					name: 'warningRuleChange',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									title: 'Content',
									name: 'content',
									type: 'localeBlock',
								},
								{
									title: 'Link',
									name: 'link',
									type: 'localeString',
								},
								{
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								},
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				},
				{
					title: 'Buitenlandse zaken waarschuwing',
					name: 'foreignAffairs',
					type: 'localeBlock',
				},
				{
					title: 'Titel',
					name: 'title',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									title: 'Content',
									name: 'content',
									type: 'localeString',
								},
								{
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								},
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				},
				{
					title: 'Heenreis',
					name: 'outbound',
					type: 'travelCard',
				},
				{
					title: 'Tussenstop',
					name: 'stopover',
					type: 'travelCard',
				},
				{
					title: 'Terugreis',
					name: 'return',
					type: 'travelCard',
				},
			],
		},
		{
			title: 'Quarantaineschema',
			name: 'quarantinePlan',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									title: 'Heading',
									name: 'content',
									type: 'localeString',
								},
								{
									title: 'Content',
									name: 'contentBlock',
									type: 'localeBlock',
								},
								{
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								},
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				},
				{
					title: 'Thuiskomst',
					name: 'return',
					type: 'travelCard',
				},
				{
					title: 'Vandaag',
					name: 'today',
					type: 'travelCard',
				},
				{
					title: 'Testdag',
					name: 'testDay',
					type: 'travelCard',
				},
				{
					title: 'Einde',
					name: 'end',
					type: 'travelCard',
				},
			],
		},
		{
			title: 'Veelgestelde vragen',
			name: 'faq',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Bekijk alle veelgestelde vragen',
					name: 'viewAll',
					type: 'localeString',
				},
			],
		},
		{
			title: 'Quarantainetips',
			name: 'quarantinetips',
			type: 'object',
			fields: [
				{
					title: 'Button',
					name: 'button',
					type: 'localeString',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
			],
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
	preview: {
		select: {
			title: 'startDate',
		},
	},
};
