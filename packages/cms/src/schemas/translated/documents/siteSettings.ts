import { defineType, defineField } from 'sanity'

export default defineType({
	title: 'Site Settings',
	name: 'siteSettings',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
		defineField({
			title: 'Site URL',
			name: 'baseUrl',
			type: 'string',
		}),

		// masthead
		defineField({
			title: 'Navigatiebalk',
			name: 'masthead',
			type: 'object',
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Menu',
					name: 'menu',
					type: 'object',
					fields: [
						defineField({
							title: 'Landmark label',
							name: 'landmarkLabel',
							description:
								'Word alleen voorgelezen door screenreaders, vermijd het woord "navigatie" of "menu".',
							type: 'string',
						}),
						defineField({
							title: 'Menu button label',
							name: 'menuButtonLabel',
							type: 'string',
						}),
						defineField({
							title: 'Home label',
							name: 'homeLabel',
							type: 'string',
						}),
						defineField({
							title: 'Menu title',
							name: 'menuTitle',
							type: 'string',
						}),
						defineField({
							title: 'Hoofdmenu interne links',
							name: 'internalPageCollection',
							type: 'internalPageSelector',
						}),
						defineField({
							title: 'Extra menu',
							name: 'extraMenu',
							type: 'object',
							fields: [
								defineField({
									title: 'Title',
									name: 'title',
									type: 'string',
								}),
								defineField({
									title: 'Extra pagina’s',
									name: 'internalPageCollection',
									type: 'internalPageSelector',
								}),
							],
						}),
					],
				}),

				defineField({
					title: 'Skiplink',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'skipLink',
					type: 'string',
				}),
			],
		}),

		// mastfoot
		defineField({
			title: 'Footer',
			name: 'mastfoot',
			type: 'object',
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					description: 'Word alleen getoond voor screenreader gebruikers',
					type: 'string',
				}),
				defineField({
					title: 'Kolommen',
					name: 'columns',
					type: 'array',
					validation: (Rule) => Rule.min(1).max(3),
					of: [
						{
							type: 'object',
							name: 'column',
							title: 'Kolom',
							fields: [
								defineField({
									name: 'title',
									title: 'Titel',
									type: 'string',
								}),
								defineField({
									name: 'content',
									title: 'Content',
									type: 'customBlock',
								}),
								defineField({
									title: 'Interne links',
									name: 'internalPageCollection',
									type: 'internalPageSelector',
								}),
							],
						},
					],
				}),
			],
		}),

		// Language selector
		defineField({
			title: 'Taal selector',
			name: 'localeSelector',
			type: 'object',
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Wissel van taal',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'change',
					type: 'string',
				}),
				defineField({
					title: 'Huidige taal',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'current',
					type: 'string',
				}),
			],
		}),

		// logo
		defineField({
			title: 'Logo',
			name: 'logo',
			type: 'object',
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Alternatief',
					name: 'alt',
					type: 'string',
				}),
			],
		}),
	],
});
