import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Situatie Resultaat Documenten',
	name: 'situation-result-document',
	type: 'document',
	fields: [
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
					type: 'localeString',
				}),
				defineField({
					title: 'Afbeelding',
					name: 'image',
					type: 'image',
				}),
				defineField({
					title: 'Toon ernstige klachten',
					name: 'showSeriousSymptoms',
					type: 'boolean',
				}),
			],
		}),
		defineField({
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
						defineField({
							title: 'Titel',
							name: 'title',
							type: 'localeString',
						}),
						defineField({
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						}),
						defineField({
							title: 'Dagen sinds event om op te tonen',
							name: 'showOn',
							type: 'array',
							of: [{ type: 'number' }],
						}),
					],
				},
			],
		}),
		defineField({
			title: 'Advies',
			name: 'advice',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				}),
				defineField({
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
								defineField({
									title: 'Dag',
									name: 'day',
									type: 'number',
								}),
								defineField({
									title: 'Titel',
									name: 'title',
									type: 'localeString',
								}),
								defineField({
									title: 'Content',
									name: 'content',
									type: 'localeBlock',
								}),
								defineField({
									title: 'Dagen sinds event om op te tonen',
									name: 'showOn',
									type: 'array',
									of: [{ type: 'number' }],
								}),
							],
						},
					],
				}),
				{
					title: 'Cards titel',
					name: 'secondaryTitle',
					type: 'localeString',
				},
				{
					title: 'Cards',
					name: 'cards',
					type: 'array',
					of: [
						{
							title: 'Card',
							name: 'card',
							type: 'reference',
							to: [{ type: 'content-card-document' }],
						},
					],
				},
			],
		}),
		defineField({
			title: 'Informeer Contacten',
			name: 'informContactsReference',
			type: 'reference',
			to: [{ type: 'inform-contacts-document' }],
		}),
		defineField({
			title: 'Meer tips',
			name: 'moreTips',
			type: 'moreTips',
		}),
		defineField({
			title: 'Hulp',
			name: 'assistanceReference',
			type: 'reference',
			to: [{ type: 'assistance-document' }],
		}),
		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title.nl',
				isUnique: () => true,
			},
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'string',
		}),
	],
	preview: {
		select: {
			title: 'header.title.nl',
			subtitle: 'slug.current',
			media: 'header.image',
		},
	},
});
