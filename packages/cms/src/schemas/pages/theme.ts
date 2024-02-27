import { isUniqueInLocale } from '../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'theme-page' });
}

export default defineType({
	title: 'Thema pagina',
	name: 'theme-page',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
		generatePage: true,
	},
	fieldsets: [
		{
			title: 'Verhalen',
			name: 'tales',
		},
	],
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
			title: 'Toon het feedback blok',
			name: 'showFeedback',
			type: 'boolean',
			description: 'Als deze toggle aan staat genereren we een feedback blok.',
		}),

		defineField({
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),

		defineField({
			title: 'Meest gestelde vragen',
			name: 'cards',
			type: 'cards',
		}),

		defineField({
			title: 'Flow titel',
			name: 'titleFlow',
			type: 'string',
		}),

		defineField({
			title: 'Vraag startpunten',
			name: 'ctaButtonCollection',
			type: 'ctaButtonSelectorWithCategories',
		}),

		defineField({
			title: 'Als FAQ?',
			description: 'Toon verhalen als FAQ items',
			name: 'talesAsDisclosure',
			type: 'boolean',
			fieldset: 'tales',
		}),

		defineField({
			title: 'Verhalen',
			description: 'Verhalen op deze pagina worden getoond als een accordion',
			name: 'taleCollection',
			type: 'taleSelector',
			fieldset: 'tales',
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
			title: 'Slug',
			name: 'slug',
			type: 'slug',
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
			overviewTitle: 'overview.title',
			icon: 'overview.icon',
			locale: '__i18n_lang',
			slug: 'slug.current',
		},
		prepare(selection) {
			const { title, overviewTitle, locale, slug, icon } = selection;
			return {
				title: overviewTitle || title,
				media: icon,
				subtitle: `/${locale}/${slug}`,
			};
		},
	},
});
