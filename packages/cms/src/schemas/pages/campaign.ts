import { isUniqueInLocale } from '../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({
		slug,
		context,
		type: 'campaign-page',
	});
}

export default defineType({
	title: 'Campagne pagina',
	name: 'campaign-page',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	fieldsets: [
		{ name: 'urlStructure', title: 'Url structuur' },
		{
			title: 'Verhalen',
			name: 'tales',
		},
	],
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
			title: 'Verhalen',
			description: 'Verhalen op deze pagina worden getoond als een accordion',
			name: 'taleCollection',
			type: 'taleSelector',
			fieldset: 'tales',
		}),

		defineField({
			title: 'Tabbladen',
			name: 'tabs',
			type: 'array',
			description: 'Voeg tabbladen toe voor het tabblad element',
			of: [
				{
					title: 'Tabblad',
					name: 'tab',
					type: 'reference',
					to: [{ type: 'tab' }],
				},
			],
		}),

		defineField({
			title: 'Hulp per onderwerp',
			name: 'support',
			type: 'reference',
			to: [{ type: 'support' }],
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
