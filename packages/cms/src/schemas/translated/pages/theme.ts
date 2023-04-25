import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'theme-page' });
}

export default defineType({
	title: 'Thema pagina',
	name: 'theme-page',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
		}),
		defineField({
			title: 'Overzicht',
			name: 'overview',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Icoon',
					name: 'icon',
					type: 'image',
				}),
			],
		}),
		defineField({
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),
		defineField({
			title: 'Flow titel',
			name: 'titleFlow',
			type: 'string',
			description: 'Deze titel komt na `X situatie(s)` boven de startpunten',
		}),
		defineField({
			title: 'Vraag startpunten',
			name: 'ctaButtonCollection',
			type: 'ctaButtonSelector',
		}),
		defineField({
			title: 'Tales',
			name: 'taleCollection',
			type: 'taleSelector',
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
		},
		prepare(selection) {
			const { title, locale, slug } = selection;
			return {
				title: title,
				subtitle: `/${locale}/${slug}`,
			};
		},
	},
});
