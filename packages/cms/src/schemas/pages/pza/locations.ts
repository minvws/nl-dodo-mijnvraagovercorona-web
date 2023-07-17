import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';
import { defineType, defineField } from 'sanity';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'locations-page' });
}

export default defineType({
	title: 'Locaties pagina',
	name: 'locations-page',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	fieldsets: [{ name: 'urlStructure', title: 'Url structuur' }],
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
		}),

		defineField({
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),

		defineField({
			title: 'Resultaten',
			name: 'result',
			type: 'object',
			validation: (Rule) => Rule.required(),
			fields: [
				defineField({
					title: 'Laad status',
					name: 'loading',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Geen resultaat',
					name: 'noResult',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		defineField({
			title: 'Filter',
			name: 'filter',
			type: 'object',
			fields: [
				defineField({
					title: 'Zoek op plaatsnaam',
					name: 'searchLabel',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),

		defineField({
			title: 'Locatie',
			name: 'location',
			type: 'object',
			validation: (Rule) => Rule.required(),
			options: { collapsible: true },
			fields: [
				defineField({
					title: 'Openinstijden',
					name: 'openingHours',
					type: 'object',
					validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							title: 'Titel',
							name: 'title',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Tekst boven openingstijden tabel',
							name: 'content',
							type: 'customBlock',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Onbekende tijden',
							name: 'unknownOpeningHours',
							type: 'string',
							// validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Nu open',
							name: 'openNow',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Vandaag geopend',
							name: 'openToday',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Open vanaf',
							name: 'openFrom',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Gesloten',
							name: 'closed',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Feedback',
							name: 'feedback',
							type: 'object',
							// validation: (Rule) => Rule.required(),
							fields: [
								defineField({
									title: 'Tekst',
									name: 'content',
									type: 'string',
									// validation: (Rule) => Rule.required(),
								}),
								defineField({
									title: 'Link label',
									name: 'label',
									type: 'string',
									// validation: (Rule) => Rule.required(),
								}),
							],
						}),
					],
				}),
				defineField({
					title: 'Kopieer knop',
					name: 'copyButton',
					type: 'object',
					validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							title: 'Kopieer',
							name: 'copy',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							title: 'Gekopieerd',
							name: 'copied',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
				defineField({
					title: 'Instructies',
					name: 'instructions',
					type: 'customBlock',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Notitie',
					name: 'note',
					type: 'customBlock',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			title: 'Over deze locatie',
			name: 'about',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					// validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Onderdelen',
					name: 'items',
					type: 'array',
					of: [
						defineField({
							title: 'Onderdeel',
							name: 'item',
							type: 'object',
							preview: {
								select: {
									title: 'label',
									subtitle: 'vaccinationSeries',
								},
							},
							fields: [
								defineField({
									title: 'Vaccinatie series',
									name: 'vaccinationSeries',
									type: 'string',
									options: {
										list: [
											{
												title: 'Basis (1e & 2e prik)',
												value: 'b',
											},
											{
												title: 'Alleen herhaalprik',
												value: 'b1',
											},
											{
												title: 'Basis + herhaalprik',
												value: 'bb1',
											},
										],
									},
								}),
								defineField({
									title: 'Label',
									name: 'label',
									type: 'customBlock',
								}),
								defineField({
									title: 'Icoon',
									name: 'icon',
									type: 'iconPicker',
								}),
							],
						}),
					],
				}),
			],
		}),

		defineField({
			title: 'Dit neem je mee',
			name: 'bring',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					title: 'Onderdelen',
					name: 'items',
					type: 'array',
					of: [
						defineField({
							title: 'Onderdeel',
							name: 'item',
							type: 'object',
							preview: {
								select: {
									title: 'label',
									subtitle: 'icon',
								},
							},
							fields: [
								defineField({
									title: 'Label',
									name: 'label',
									type: 'customBlock',
								}),
								defineField({
									title: 'Icoon',
									name: 'icon',
									type: 'iconPicker',
								}),
							],
						}),
					],
				}),
			],
		}),

		defineField({
			title: 'Wat kun je verwachten?',
			name: 'expectations',
			type: 'object',
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
					type: 'customBlock',
					// validation: (Rule) => Rule.required(),
				}),
			],
		}),

		defineField({
			title: 'Sub pagina referentie',
			description:
				'Genereert deze pagina onder een andere pagina in de hierachie',
			name: 'subFolderReference',
			type: 'pageSourceSelector',
			fieldset: 'urlStructure',
		}),

		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			fieldset: 'urlStructure',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'metaData.title',
				isUnique: isUnique,
			},
		}),
	],
	preview: {
		select: {
			title: 'hero.title',
			locale: '__i18n_lang',
			slug: 'slug.current',
			subFolderReferenceSlug: 'subFolderReference.slug.current',
			media: 'hero.image',
		},
		prepare(selection) {
			const { title, locale, slug, subFolderReferenceSlug, media } = selection;
			return {
				title: title,
				subtitle: `/${locale}${
					subFolderReferenceSlug ? `/…/${subFolderReferenceSlug}` : ''
				}/${slug}`,
				media,
			};
		},
	},
});
