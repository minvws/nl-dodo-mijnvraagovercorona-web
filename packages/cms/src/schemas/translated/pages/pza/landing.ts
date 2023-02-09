import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'PZA landing pagina',
	name: 'pza-landing-page',
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
	],
	preview: {
		select: {
			title: 'metaData.title',
			locale: '__i18n_lang',
			theme: 'theme.slug.current',
		},
		prepare(selection) {
			const { title, locale, theme } = selection;
			return {
				title: title,
				subtitle: `/${locale}/${theme}/prikkenzonderafspraak`,
			};
		},
	},
});
