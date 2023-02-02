import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Reizen Landing Pagina',
	name: 'landing-page',
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
					title: 'Subtitel',
					name: 'subtitle',
					type: 'localeString',
				}),
				defineField({
					title: 'Button',
					name: 'button',
					type: 'localeString',
				}),
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),
		defineField({
			title: 'Uitleg',
			name: 'uitleg',
			type: 'array',
			of: [
				{
					title: 'Onderdeel',
					name: 'item',
					type: 'object',
					preview: {
						select: {
							title: 'title.nl',
							subtitle: 'pretitle.nl',
							media: 'image',
						},
					},
					fields: [
						defineField({
							title: 'Voortitel',
							name: 'pretitle',
							type: 'localeString',
						}),
						defineField({
							title: 'Titel',
							name: 'title',
							type: 'localeString',
						}),
						defineField({
							title: 'Omschrijving',
							name: 'description',
							type: 'localeBlock',
						}),
						defineField({
							title: 'Afbeelding',
							name: 'image',
							type: 'image',
						}),
						defineField({
							title: 'Linklijstje',
							name: 'linklist',
							type: 'object',
							fields: [
								defineField({
									title: 'id',
									name: 'id',
									type: 'localeString',
								}),
								defineField({
									title: 'USP',
									name: 'usp',
									type: 'localeString',
								}),
							],
						}),
					],
				},
			],
		}),
		defineField({
			title: 'Placeholder',
			name: 'placeholder',
			type: 'localeString',
		}),
		defineField({
			title: 'Zoekveld label',
			name: 'searchLabel',
			type: 'localeString',
		}),
		defineField({
			title: 'Niet gevonden',
			name: 'nietGevonden',
			type: 'localeString',
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'string',
		}),
	],
});
