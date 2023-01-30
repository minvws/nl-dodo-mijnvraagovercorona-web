import { defineField, defineType } from 'sanity'

export default defineType({
	title: 'Reizen Resultaat Pagina',
	name: 'resultaat-page',
	type: 'document',
	fields: [
		defineField({
			title: 'Start Datum',
			name: 'startDate',
			type: 'date',
		}),
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		}),
		defineField({
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									title: 'Content',
									name: 'content',
									type: 'localeString',
								}),
								defineField({
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								}),
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				}),
				defineField({
					title: 'Subtitel',
					name: 'subtitle',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									title: 'Content',
									name: 'content',
									type: 'localeString',
								}),
								defineField({
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								}),
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				}),
				defineField({
					title: 'Laatst gewijzigd',
					name: 'lastChanged',
					type: 'localeString',
				}),
				defineField({
					title: 'Nog steeds geldig',
					name: 'stillValid',
					type: 'localeString',
				}),
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),
		defineField({
			title: 'Reisschema',
			name: 'travelPlan',
			type: 'object',
			fields: [
				defineField({
					title: 'Waarschuwing Regelwijziging',
					name: 'warningRuleChange',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									title: 'Content',
									name: 'content',
									type: 'localeBlock',
								}),
								defineField({
									title: 'Link',
									name: 'link',
									type: 'localeString',
								}),
								defineField({
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								}),
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				}),
				defineField({
					title: 'Buitenlandse zaken waarschuwing',
					name: 'foreignAffairs',
					type: 'localeBlock',
				}),
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									title: 'Content',
									name: 'content',
									type: 'localeString',
								}),
								defineField({
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								}),
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				}),
				defineField({
					title: 'Terugreis',
					name: 'return',
					type: 'travelCard',
				}),
				defineField({
					title: 'Heenreis',
					name: 'outbound',
					type: 'travelCard',
				}),
			],
		}),
		defineField({
			title: 'Quarantaineschema',
			name: 'quarantinePlan',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								defineField({
									title: 'Heading',
									name: 'content',
									type: 'localeString',
								}),
								defineField({
									title: 'Content',
									name: 'contentBlock',
									type: 'localeBlock',
								}),
								defineField({
									title: 'Condities',
									name: 'conditions',
									type: 'conditions',
								}),
							],
							preview: {
								select: {
									title: 'content.nl',
								},
							},
						},
					],
				}),
				defineField({
					title: 'Thuiskomst',
					name: 'return',
					type: 'travelCard',
				}),
				defineField({
					title: 'Vandaag',
					name: 'today',
					type: 'travelCard',
				}),
				defineField({
					title: 'Testdag',
					name: 'testDay',
					type: 'travelCard',
				}),
				defineField({
					title: 'Einde',
					name: 'end',
					type: 'travelCard',
				}),
			],
		}),
		defineField({
			title: 'Tussenstop of nieuwe bestemming',
			name: 'stopover',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
				{
					title: 'Button',
					name: 'button',
					type: 'localeString',
				},
			],
		}),
		defineField({
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
		}),
		defineField({
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
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'string',
		}),
	],
	preview: {
		select: {
			title: 'startDate',
		},
	},
});
