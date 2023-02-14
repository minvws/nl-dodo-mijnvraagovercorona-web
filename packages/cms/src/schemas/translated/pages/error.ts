import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'error-page' });
}

export default defineType({
	title: '404 Pagina',
	name: 'error-page',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
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
		// defineField({
		// 	title: 'Header',
		// 	name: 'header',
		// 	type: 'object',
		// 	fields: [
		// 		defineField({
		// 			title: 'Chapeau',
		// 			name: 'chapeau',
		// 			type: 'string',
		// 		}),
		// 		defineField({
		// 			title: 'Titel',
		// 			name: 'title',
		// 			type: 'string',
		// 		}),
		// 		defineField({
		// 			title: 'Illustratie',
		// 			name: 'image',
		// 			type: 'image',
		// 		}),
		// 	],
		// }),
		defineField({
			title: 'Button',
			name: 'button',
			type: 'flexibleButton',
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlock',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Technische melding',
			name: 'errormessage',
			type: 'string',
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
			title: 'hero.title',
			locale: '__i18n_lang',
			slug: 'slug.current',
		},
		prepare(selection) {
			const { title, locale, slug } = selection;
			return {
				title: title,
				subtitle: `${locale}/${slug}`,
			};
		},
	},
});
