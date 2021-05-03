import { blockContentPreview } from '../../../utilities/blockContentPreview';

export default {
	title: 'Reizen Resultaat Pagina',
	name: 'resultaat-page',
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
				// {
				// 	title: 'Samenvatting',
				// 	name: 'summary',
				// 	type: 'array',
				// 	of: [
				// 		{
				// 			type: 'object',
				// 			fields: [
				// 				{
				// 					title: 'Icoon',
				// 					name: 'icon',
				// 					type: 'string',
				// 					options: { list: ['safe', 'warning-yellow', 'warning-red'] },
				// 				},
				// 				{
				// 					title: 'Content',
				// 					name: 'content',
				// 					type: 'localeBlock',
				// 				},
				// 				{
				// 					title: 'Condities',
				// 					name: 'conditions',
				// 					type: 'conditions',
				// 				},
				// 			],
				// 			preview: blockContentPreview,
				// 		},
				// 	],
				// },
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
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Voorbereiding',
					name: 'preparation',
					type: 'travelCard',
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
					type: 'localeString',
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
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
