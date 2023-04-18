import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Tale',
	name: 'tale',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
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
		defineField({
			title: 'Overzicht',
			name: 'overview',
			type: 'object',
			description:
				'wordt alleen weergegeven op pagina’s met een TOC. Wanneer er geen hoofdtitel is ingevoerd word deze titel gebruikt in het overzicht in het CMS',
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
	],
	preview: {
		select: {
			title: 'title',
			overviewTitle: 'overview.title',
			icon: 'overview.icon',
			picture: 'picture.image',
			locale: '__i18n_lang',
			referenceTitle: '__i18n_base.title',
		},
		prepare(selection) {
			const { title, overviewTitle, icon, picture, locale, referenceTitle } =
				selection;
			return {
				title: overviewTitle || title,
				media: icon || picture,
				subtitle: `${referenceTitle ? `${referenceTitle} - ` : ''}${locale}`,
			};
		},
	},
});
