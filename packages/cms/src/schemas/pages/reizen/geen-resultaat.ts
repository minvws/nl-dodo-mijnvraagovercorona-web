export default {
	title: 'Reizen Geen Resultaat Pagina',
	name: 'geen-resultaat-page',
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
					type: 'localeString',
				},
				{
					title: 'Samenvatting',
					name: 'summary',
					type: 'array',
					of: [
						{
							type: 'object',
							fields: [
								{
									title: 'Icoon',
									name: 'icon',
									type: 'string',
									options: { list: ['safe', 'warning-yellow', 'warning-red'] },
								},
								{
									title: 'Content',
									name: 'content',
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
									content: 'content',
								},
								prepare({
									content,
								}: {
									content: {
										nl: {
											_type: string;
											children: { _type: string; text: string }[];
										}[];
									};
								}) {
									const block = (content.nl || []).find(
										(block) => block._type === 'block',
									);
									return {
										title: block
											? block.children
													.filter((child) => child._type === 'span')
													.map((span) => span.text)
													.join('')
											: 'No title',
									};
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
			title: 'Opnieuw',
			name: 'recheck',
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
			],
		},
		{
			title: 'Klachten',
			name: 'symptoms',
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
					title: 'Online afspraak',
					name: 'onlineAppointment',
					type: 'localeString',
				},
				{
					title: 'Bel afspraak',
					name: 'telephoneAppointment',
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
};
