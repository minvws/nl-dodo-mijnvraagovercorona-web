export default {
	title: 'Situatie Resultaat Documenten',
	name: 'situation-result-document',
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
					title: 'Afbeelding',
					name: 'image',
					type: 'image',
				},
				{
					title: 'Toon ernstige klachten',
					name: 'showSeriousSymptoms',
					type: 'boolean',
				},
			],
		},
		{
			title: 'Situatie',
			name: 'situation',
			type: 'reference',
			to: [{ type: 'situation-flow-document' }],
		},
		{
			title: 'Antwoord',
			name: 'answer',
			type: 'array',
			of: [
				{
					title: 'Antwoord onderdeel',
					name: 'item',
					type: 'object',
					preview: {
						select: {
							content: 'content',
							showOn: 'showOn',
						},
						prepare({
							content,
							showOn,
						}: {
							content: {
								nl: { children: { _type: string; text: string }[] }[];
							};
							showOn?: number[];
						}) {
							return {
								title: content?.nl[0].children
									? content.nl[0].children
											.filter((child) => child._type === 'span')
											.map((span) => span.text)
											.join('')
									: 'Geen titel',
								subtitle: showOn
									? `Toon op dagen ${showOn.join(', ')}`
									: undefined,
							};
						},
					},
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
							title: 'Dagen sinds event om op te tonen',
							name: 'showOn',
							type: 'array',
							of: [{ type: 'number' }],
						},
					],
				},
			],
		},
		{
			title: 'Advies',
			name: 'advice',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Plan',
					name: 'plan',
					type: 'array',
					of: [
						{
							title: 'Plan Onderdeel',
							name: 'item',
							type: 'object',
							preview: {
								select: {
									content: 'content',
									showOn: 'showOn',
								},
								prepare({
									content,
									showOn,
								}: {
									content: {
										nl: { children: { _type: string; text: string }[] }[];
									};
									showOn?: number[];
								}) {
									return {
										title: content?.nl[0].children
											? content.nl[0].children
													.filter((child) => child._type === 'span')
													.map((span) => span.text)
													.join('')
											: 'Geen titel',
										subtitle: showOn
											? `Toon op dagen ${showOn.join(', ')}`
											: undefined,
									};
								},
							},
							fields: [
								{
									title: 'Dag',
									name: 'day',
									type: 'number',
								},
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
									title: 'Dagen sinds event om op te tonen',
									name: 'showOn',
									type: 'array',
									of: [{ type: 'number' }],
								},
							],
						},
					],
				},
			],
		},
		{
			title: 'Informeer Contacten',
			name: 'informContactsReference',
			type: 'reference',
			to: [{ type: 'inform-contacts-document' }],
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title.nl',
				isUnique: () => true,
			},
		},
	],
	preview: {
		select: {
			title: 'slug.current',
			subtitle: 'situation.name.nl',
		},
	},
};
