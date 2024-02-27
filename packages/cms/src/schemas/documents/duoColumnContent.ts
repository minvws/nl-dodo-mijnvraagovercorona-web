import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Content Feed',
	name: 'duo-column-content',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	preview: {
		select: {
			title: 'overviewTitle',
			locale: '__i18n_lang',
			referenceTitle: '__i18n_base.overviewTitle',
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
			title: 'Naam in CMS overzicht',
			name: 'overviewTitle',
			type: 'string',
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			title: 'Kolom 1',
			name: 'columnOne',
			type: 'object',
			fields: [
				defineField({
					title: 'Content',
					name: 'content',
					type: 'customBlock',
					validation: (Rule: any) => Rule.required(),
				}),
				defineField({
					title: 'afbeelding',
					name: 'picture',
					type: 'picture',
				}),
			],
		}),
		defineField({
			title: 'Kolom 2',
			name: 'columnTwo',
			type: 'object',
			fields: [
				defineField({
					title: 'Content',
					name: 'content',
					type: 'customBlock',
				}),
				defineField({
					title: 'afbeelding',
					name: 'picture',
					type: 'picture',
				}),
			],
		}),
	],
});
