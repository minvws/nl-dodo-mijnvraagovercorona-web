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
			title: 'Headers',
			name: 'headers',
			type: 'array',
			of: [
				{
					name: 'header',
					type: 'object',
					fields: [
						{
							title: 'Header',
							name: 'content',
							type: 'header',
						},
						{
							title: 'Condities',
							name: 'conditions',
							type: 'conditions',
						},
					],
					preview: {
						select: {
							title: 'content.title.nl',
							meansOfTransport0: 'conditions.meansOfTransport.0.label',
							meansOfTransport1: 'conditions.meansOfTransport.1.label',
							meansOfTransport2: 'conditions.meansOfTransport.2.label',
						},
						prepare({
							title,
							meansOfTransport0,
							meansOfTransport1,
							meansOfTransport2,
						}: {
							title: string;
							meansOfTransport0?: string;
							meansOfTransport1?: string;
							meansOfTransport2?: string;
						}) {
							const meansOfTransports = [
								meansOfTransport0,
								meansOfTransport1,
								meansOfTransport2,
							].filter(Boolean);

							return {
								title,
								subtitle: meansOfTransports.join(', '),
							};
						},
					},
				},
			],
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
					preview: {
						select: {
							meansOfTransport0: 'conditions.meansOfTransport.0.label',
							meansOfTransport1: 'conditions.meansOfTransport.1.label',
							meansOfTransport2: 'conditions.meansOfTransport.2.label',
						},
						prepare({
							meansOfTransport0,
							meansOfTransport1,
							meansOfTransport2,
						}: {
							meansOfTransport0?: string;
							meansOfTransport1?: string;
							meansOfTransport2?: string;
						}) {
							const meansOfTransports = [
								meansOfTransport0,
								meansOfTransport1,
								meansOfTransport2,
							].filter(Boolean);

							return {
								title: meansOfTransports.join(','),
							};
						},
					},
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
