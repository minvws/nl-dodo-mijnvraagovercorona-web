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
			title: 'Content',
			name: 'content',
			type: 'customBlock',
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
			media: 'overview.icon',
			lang: '__i18n_lang',
		},
		prepare(selection) {
			const { title, overviewTitle, media, lang } = selection;
			return {
				title: overviewTitle || title,
				media: media,
				subtitle: lang,
			};
		},
	},
});
