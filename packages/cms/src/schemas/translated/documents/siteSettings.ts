import { defineType, defineField } from 'sanity';

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

		/**
		 * Masthead
		 */
		defineField({
			title: 'Navigatiebalk',
			name: 'masthead',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Menu',
					name: 'menu',
					type: 'object',
					validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							title: 'Landmark label',
							name: 'landmarkLabel',
							description:
								'Word alleen voorgelezen door screenreaders, vermijd het woord "navigatie" of "menu".',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Menu button label',
							name: 'menuButtonLabel',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Home label',
							name: 'homeLabel',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Menu title',
							name: 'menuTitle',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Hoofdmenu interne links',
							name: 'internalPageCollection',
							type: 'internalPageSelector',
							validation: (Rule) => Rule.required(),
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
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * Mastfoot
		 */
		defineField({
			title: 'Footer',
			name: 'mastfoot',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					description: 'Word alleen getoond voor screenreader gebruikers',
					type: 'string',
					validation: (Rule) => Rule.required(),
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
									validation: (Rule) => Rule.required(),
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

		/**
		 * Language selector
		 */
		defineField({
			title: 'Taal selector',
			name: 'localeSelector',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Wissel van taal',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'change',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Huidige taal',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'current',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * Logo
		 */
		defineField({
			title: 'Logo',
			name: 'logo',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Alternatief',
					name: 'alt',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
	],
	preview: {
		select: {
			baseUrl: 'baseUrl',
		},
		prepare(selection) {
			const { baseUrl } = selection;
			return {
				title: 'Mijn Vraag Over Corona',
				subtitle: baseUrl,
			};
		},
	},
});
