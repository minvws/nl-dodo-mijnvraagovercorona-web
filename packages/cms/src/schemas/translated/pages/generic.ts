import { isUniqueInLocale } from '../../../utilities/isUniqueInLocale';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({ slug, context, type: 'generic-page' });
}

export default {
	title: 'Generic pages',
	name: 'generic-page',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				{
					title: 'Chapeau',
					name: 'chapeau',
					type: 'string',
				},
				{
					title: 'Titel',
					name: 'title',
					type: 'string',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'customBlock',
				},
			],
		},
		{
			title: 'Content',
			name: 'content',
			type: 'customBlock',
		},
		{
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
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title',
				isUnique: isUnique,
			},
		},
	],
	preview: {
		select: {
			title: 'header.title',
			subtitle: 'slug.current',
		},
	},
};
