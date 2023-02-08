import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'locations-page' });
}

export default defineType({
	title: 'PZA pagina',
	name: 'locations-page',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
		defineField({
			title: 'Thema',
			name: 'theme',
			type: 'reference',
			to: [{ type: 'theme-page' }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
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
			theme: 'theme.slug.current',
		},
		prepare(selection) {
			const { title, locale, slug, theme } = selection;
			return {
				title: title,
				subtitle: `/${locale}/${theme}/${slug}`,
			};
		},
	},
});
