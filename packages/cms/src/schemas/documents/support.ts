import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Hulpblokken',
	name: 'support',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
		defineField({
			title: 'Hulp blok',
			name: 'cards',
			type: 'supportBlocks',
		}),
	],
	preview: {
		select: {
			title: 'cards.label',
			locale: '__i18n_lang',
			referenceTitle: '__i18n_base.title',
		},
		prepare(selection) {
			const { title, locale, referenceTitle } = selection;
			return {
				title: title,
				subtitle: `${referenceTitle ? referenceTitle : locale}`,
			};
		},
	},
});
