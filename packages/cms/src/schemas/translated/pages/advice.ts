import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';
import { defineType, defineField } from 'sanity';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'advice-page' });
}

export default defineType({
	title: 'Advies pagina',
	name: 'advice-page',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
		hero: {
			showUpdatedAt: true,
		},
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
			title: 'Toon ernstige klachten',
			name: 'showSeriousSymptoms',
			type: 'boolean',
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
							content: { children: { _type: string; text: string }[] }[];
							showOn?: number[];
						}) {
							return {
								title: content[0]?.children
									? content[0].children
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
							type: 'string',
						}),
						defineField({
							title: 'Content',
							name: 'content',
							type: 'customBlock',
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
					type: 'string',
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
									content: { children: { _type: string; text: string }[] }[];
									showOn?: number[];
								}) {
									return {
										title: content[0]?.children
											? content[0].children
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
									type: 'string',
								}),
								defineField({
									title: 'Content',
									name: 'content',
									type: 'customBlock',
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
					title: 'Kaarten',
					name: 'cards',
					type: 'object',
					fields: [
						defineField({
							title: 'title',
							name: 'title',
							type: 'string',
						}),
						defineField({
							title: 'Kaarten',
							name: 'items',
							type: 'array',
							of: [
								{
									title: 'Card',
									name: 'card',
									type: 'reference',
									to: [{ type: 'card' }],
								},
							],
						}),
					],
				}),
			],
		}),

		defineField({
			title: 'Hulp',
			name: 'assistance',
			type: 'reference',
			to: [{ type: 'assistance' }],
			options: {
				filter: filterReferenceByLanguage,
			},
		}),

		defineField({
			title: 'Meer info',
			name: 'moreInfo',
			type: 'moreInfo',
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
