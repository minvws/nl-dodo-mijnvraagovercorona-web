import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../../../utilities/filterReferenceByLanguage';

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
		defineField({
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),
		defineField({
			title: 'Knoppen',
			name: 'buttons',
			type: 'array',
			validation: (Rule) => Rule.min(1).max(2),
			of: [
				defineField({
					title: 'Knop',
					name: 'button',
					type: 'flexibleButton',
				}),
			],
		}),
		defineField({
			title: 'Content onder knoppen',
			name: 'contentSecondary',
			type: 'customBlock',
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
