import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';
import { defineType, defineField } from 'sanity';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'advice-page' });
}

export default defineType({
	title: 'Vraag pagina',
	name: 'question-page',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
		// hero: {
		// 	showUpdatedAt: true,
		// },
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
