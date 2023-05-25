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
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Pagina titel suffix',
			name: 'pageTitleSuffix',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Social share image',
			name: 'socialShareImage',
			description: '1200x632, geen SVG',
			type: 'image',
			validation: (Rule) => Rule.required(),
		}),

		/**
		 * Masthead
		 */
		defineField({
			title: 'Navigatiebalk',
			name: 'masthead',
			type: 'object',
			validation: (Rule) => Rule.required(),
			// hidden: true,
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Skiplink',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'skiplink',
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
		 * Privacy
		 */
		defineField({
			title: 'Privacy',
			name: 'privacy',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'id',
					name: 'id',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'USP',
					name: 'usp',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Beloftes',
					name: 'beloftes',
					type: 'array',
					validation: (Rule) => Rule.required(),
					of: [{ type: 'string' }],
					options: {
						sortable: false,
						modal: {
							type: 'popover',
						},
					},
				}),
			],
		}),

		/**
		 * Feedback
		 */
		defineField({
			title: 'Feedback',
			description: 'Wordt alleen gebruikt op de nederlandse & engelse versie',
			name: 'feedback',
			type: 'object',
			// validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Content',
					name: 'content',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Button',
					name: 'button',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Bedank',
					name: 'thanks',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'URL',
					name: 'url',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'labels',
					name: 'labels',
					type: 'object',
					// validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							title: 'Ja',
							name: 'like',
							type: 'string',
						}),
						defineField({
							title: 'Nee',
							name: 'dislike',
							type: 'string',
						}),
					],
				}),
			],
		}),

		/**
		 * Generic labels
		 */
		defineField({
			title: 'Generieke labels',
			name: 'genericLabels',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Open',
					name: 'open',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Sluiten',
					name: 'close',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Over',
					name: 'in',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Van',
					description: 'Bijvoorbeeld: 1 van 5 situaties',
					name: 'of',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Dag',
					name: 'dayPlural',
					type: 'thisOrThatString',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Geleden',
					name: 'ago',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Vandaag',
					name: 'today',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Meer dan',
					name: 'moreThan',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Bronnen',
					name: 'sources',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Meer info',
					name: 'moreInfo',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Laatst bijgewerkt',
					name: 'updatedAt',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Situatie enkelvoud/meervoud',
					name: 'situationPlural',
					type: 'thisOrThatString',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Bekijk nog X',
					name: 'seeMoreExpand',
					type: 'thisOrThatString',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Kaart',
					name: 'map',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Lijst',
					name: 'list',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Alles',
					description: 'Bijv. het "Alles" label in een filter',
					name: 'all',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * severe symptoms advice
		 */
		defineField({
			title: 'Advies ernstige klachten',
			name: 'severeSymptomsAdvice',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: {
				collapsible: true,
			},
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Subtitel',
					name: 'subtitle',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Icoon',
					name: 'icon',
					type: 'image',
					validation: (Rule) => Rule.required(),
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

		/**
		 * Forms
		 */
		defineField({
			title: 'Formulieren',
			name: 'forms',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: {
				collapsible: true,
			},
			fields: [
				defineField({
					title: 'Filter op',
					name: 'filterOn',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Maak veld leeg',
					name: 'clearField',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * accessibility
		 */
		defineField({
			title: 'Toegankelijkheid',
			name: 'accessibility',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: {
				collapsible: true,
			},
			fields: [
				defineField({
					title: 'Onzichtbaar label bij externe links',
					name: 'labelExternalLink',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Onzichtbaar label bij inline modals',
					name: 'labelModal',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Onzichtbaar "Sluit" label in modals',
					name: 'labelModalClose',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		/**
		 * Vaccinations
		 */
		defineField({
			title: 'Vaccinaties',
			name: 'vaccinations',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Series',
					name: 'series',
					type: 'object',
					validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							title: 'Basis',
							name: 'b',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Herhaalprik',
							name: 'b1',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			locale: '__i18n_lang',
		},
		prepare(selection) {
			const { locale } = selection;
			return {
				title: 'Mijn Vraag Over Corona',
				subtitle: locale,
			};
		},
	},
});
