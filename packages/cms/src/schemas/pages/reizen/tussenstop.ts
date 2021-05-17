export default {
	title: 'Reizen Tussenstop Pagina',
	name: 'tussenstop-page',
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
			title: 'Button',
			name: 'toResultButton',
			type: 'localeString',
		},
		{
			title: 'Opties',
			name: 'options',
			type: 'array',
			of: [
				{
					name: 'options',
					type: 'object',
					fields: [
						{
							title: 'Radiobuttons',
							name: 'content',
							type: 'array',
							of: [
								{
									type: 'object',
									fields: [
										{
											title: 'Naam',
											name: 'name',
											type: 'string',
										},
										{
											title: 'Label',
											name: 'label',
											type: 'localeBlock',
										},
									],
									preview: {
										select: {
											title: 'label.nl',
										},
									},
								},
							],
						},
						{
							title: 'Condities',
							name: 'conditions',
							type: 'conditions',
						},
					],
				},
			],
		},
		{
			title: '"Land niet gevonden"-tekst',
			name: 'notFound',
			type: 'localeString',
		},
		{
			title: 'Slechtzienden tekst label dat uitleg geeft over land zoekveld',
			name: 'searchLabel',
			type: 'localeString',
		},
		{
			title: 'Land zoekveld placeholder',
			name: 'placeholder',
			type: 'localeString',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
