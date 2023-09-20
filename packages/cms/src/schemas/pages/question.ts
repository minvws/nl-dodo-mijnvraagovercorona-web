import { isUniqueInLocale } from '../../utilities/isUniqueInLocale';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';
import { defineType, defineField } from 'sanity';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'advice-page' });
}

export default defineType({
	title: 'Vraag pagina',
	name: 'question-page',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
		generatePage: true,
	},
	fieldsets: [{ name: 'urlStructure', title: 'Url structuur' }],
	fields: [
		defineField({
			title: 'Genereer pagina',
			name: 'generatePage',
			type: 'boolean',
		}),
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
		}),

		defineField({
			title: 'Overzicht',
			name: 'overview',
			type: 'overview',
		}),

		defineField({
			title: 'Kruimelpad titel',
			name: 'breadcrumbTitle',
			type: 'string',
			description: 'Verkorte kruimelpad titel (optioneel)',
		}),

		defineField({
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),

		defineField({
			title: 'Content',
			name: 'contentReference',
			type: 'reference',
			to: [{ type: 'duo-column-content' }],
			options: {
				filter: filterReferenceByLanguage,
			},
		}),

		defineField({
			title: 'Vraag',
			name: 'question',
			type: 'object',
			fields: [
				defineField({
					title: 'Type vraag',
					name: 'type',
					type: 'string',
					options: {
						list: [
							{ title: 'Datumprikker', value: 'datepicker' },
							{
								title: 'Multiple-choice (meerdere selecteerbaar)',
								value: 'checkbox',
							},
							{ title: 'Single-choice', value: 'radio' },
							{ title: 'Single-choice (knoppen)', value: 'button' },
						],
					},
				}),

				defineField({
					title: 'Label',
					name: 'label',
					type: 'string',
					description:
						'Dit veld word alleen getoond voor screenreader gebruikers',
					validation: (Rule) => Rule.required(),
				}),

				defineField({
					title: 'Content',
					name: 'content',
					type: 'customBlock',
				}),

				defineField({
					title: 'Antwoorden',
					name: 'multi',
					type: 'array',
					of: [
						defineField({
							title: 'Antwoord',
							name: 'answer',
							type: 'object',
							fields: [
								defineField({
									title: 'Content',
									name: 'content',
									type: 'customBlock',
									validation: (Rule) => Rule.required(),
								}),
								defineField({
									title: 'Volgende',
									name: 'next',
									type: 'reference',
									to: [{ type: 'question-page' }, { type: 'advice-page' }],
									options: {
										filter: filterReferenceByLanguage,
									},
									validation: (Rule) =>
										Rule.custom((next: any, context: any) =>
											['radio', 'button'].includes(
												context.document?.question?.type,
											) && next
												? true
												: 'Volgende verplicht',
										),
								}),
								defineField({
									title: 'Gewicht',
									name: 'weight',
									type: 'number',
									description:
										'Hoe hoger het getal hoe zwaarder het antwoord weegt',
									hidden: ({ document }: { document: any }) =>
										document?.question?.type
											? !['checkbox'].includes(document?.question?.type)
											: true,
								}),
								defineField({
									title: 'Selecteer modal',
									name: 'modalReference',
									type: 'reference',
									to: [{ type: 'modals' }],
									options: {
										filter: filterReferenceByLanguage,
									},
									hidden: ({ document }: { document: any }) =>
										document?.question?.type
											? !['checkbox', 'radio'].includes(
													document?.question?.type,
											  )
											: true,
								}),
							],
							preview: {
								select: {
									title: 'content',
									subtitle: 'next.slug.current',
								},
							},
						}),
					],
					hidden: ({ document }: { document: any }) =>
						document?.question?.type
							? !['checkbox', 'radio', 'button'].includes(
									document?.question?.type,
							  )
							: true,
				}),

				defineField({
					title: 'Toon meer',
					name: 'showMore',
					type: 'object',
					fields: [
						defineField({
							title: 'Aantal antwoorden in beeld',
							description:
								'Maximale aantal antwoorden in beeld, de rest word verstopt achter een "Meer" knop',
							name: 'max',
							type: 'number',
						}),
						defineField({
							title: 'Label',
							name: 'label',
							type: 'thisOrThatString',
						}),
					],
					hidden: ({ document }: { document: any }) =>
						document?.question?.type
							? !['checkbox', 'radio'].includes(document?.question?.type)
							: true,
				}),
			],
		}),

		defineField({
			title: 'Knoppen',
			name: 'buttons',
			type: 'array',
			validation: (Rule) => Rule.min(1).max(2),
			of: [
				{
					title: 'Button',
					name: 'button',
					type: 'object',
					fields: [
						defineField({
							title: 'Tekst',
							name: 'text',
							type: 'string',
						}),
						defineField({
							title: 'Standaard actie',
							name: 'standard',
							type: 'boolean',
						}),
						defineField({
							title: 'Volgende',
							name: 'next',
							type: 'reference',
							to: [{ type: 'question-page' }, { type: 'advice-page' }],
							options: {
								filter: filterReferenceByLanguage,
							},
						}),
						defineField({
							title: 'Variant',
							name: 'variant',
							type: 'string',
							options: {
								layout: 'dropdown',
								list: [
									{
										title: 'Primary',
										value: 'primary',
									},
									{
										title: 'Secondary',
										value: 'secondary',
									},
									{
										title: 'Tertiary',
										value: 'tertiary',
									},
									{
										title: 'Quaternary',
										value: 'quaternary',
									},
								],
							},
						}),
						defineField({
							title: 'Volledige breedte?',
							name: 'full',
							type: 'boolean',
						}),
					],
					preview: {
						select: {
							title: 'text',
							subtitle: 'next.slug.current',
						},
					},
				},
			],
		}),

		defineField({
			title: 'Hulp',
			name: 'assistance',
			type: 'reference',
			to: [{ type: 'assistance-new' }],
			options: {
				filter: filterReferenceByLanguage,
			},
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
			title: 'metaData.title',
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
