import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity'

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'generic-page' });
}

export default defineType({
	title: 'Generic pages',
	name: 'generic-page',
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
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				defineField({
					title: 'Chapeau',
					name: 'chapeau',
					type: 'string',
				}),
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
			],
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		}),
		defineField({
			title: 'Verhalen',
			name: 'storiesCollection',
			type: 'array',
			of: [
				{
					title: 'Verhaal',
					name: 'story',
					type: 'reference',
					to: [{ type: 'story-document' }],
				},
			],
		}),
		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title',
				isUnique: isUnique,
			},
		}),
	],
	preview: {
		select: {
			title: 'header.title',
			subtitle: 'slug.current',
		},
	},
});
