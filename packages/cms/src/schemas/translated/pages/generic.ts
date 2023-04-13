import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'generic-page' });
}

export default defineType({
	title: 'Generic pages',
	name: 'generic-page',
	type: 'document',
	i18n: true,
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
			title: 'Toon table of contents',
			name: 'showTOC',
			type: 'boolean',
			description:
				'Als deze toggle aan staat genereren we een table of contents.',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlock',
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
			title: 'Tales',
			name: 'taleCollection',
			type: 'taleSelector',
		}),

		defineField({
			title: 'Meer info',
			name: 'moreInfo',
			type: 'moreInfo',
		}),

		defineField({
			title: 'Bronnen',
			name: 'sources',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
					description:
						'Indien titel leeg word gelaten wordt `Bronnen` in siteSettings getoond',
				}),
				defineField({
					title: 'Content',
					name: 'content',
					type: 'customBlock',
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
