import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Carousel items',
	name: 'carousel',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	preview: {
		select: {
			title: 'title',
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
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
			description: 'Carousel cover afbeelding',
		}),
		defineField({
			title: 'Content blokken',
			name: 'multiContentBlocks',
			type: 'multiContentBlocks',
		}),
		defineField({
			title: 'Label openen carousel item',
			name: 'openItem',
			type: 'string',
		}),
	],
});
