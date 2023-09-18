import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Tabbladen',
	name: 'tab',
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
			title: 'Tab titel',
			name: 'tabTitle',
			description:
				'Korte titel in het tabje. Indien leeg zal het tabje gevuld worden met de content titel',
			type: 'string',
		}),
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Chapeau',
			name: 'chapeau',
			type: 'string',
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
			description: 'Laat dit veld leeg indien ook een video is gekozen',
		}),
		defineField({
			title: 'Video',
			name: 'video',
			type: 'video',
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		}),
		defineField({
			title: 'Knop',
			name: 'button',
			type: 'flexibleButton',
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),
	],
});
