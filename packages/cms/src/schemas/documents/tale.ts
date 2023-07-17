import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Tale',
	name: 'tale',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Afbeelding',
			name: 'picture',
			type: 'picture',
			description: 'Afbeelding word getoond naast de content',
		}),
		defineField({
			title: 'Content blokken',
			name: 'multiContentBlocks',
			type: 'multiContentBlocks',
		}),
	],
	preview: {
		select: {
			title: 'title',
			picture: 'picture.image',
			locale: '__i18n_lang',
			referenceTitle: '__i18n_base.title',
		},
		prepare(selection) {
			const { title, picture, locale, referenceTitle } = selection;
			return {
				title: title,
				media: picture,
				subtitle: `${referenceTitle ? referenceTitle : locale}`,
			};
		},
	},
});
