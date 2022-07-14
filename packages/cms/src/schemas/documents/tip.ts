export default {
	title: 'Tips',
	name: 'tip-document',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Afbeelding',
					name: 'image',
					type: 'image',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
				{
					title: 'Toon table of contents',
					name: 'showTOC',
					type: 'boolean',
					description:
						'Als deze toggle aan staat genereren we een table of contents.',
				},
			],
		},
		{
			title: 'Content Blocks',
			name: 'stories',
			type: 'array',
			of: [{ type: 'storyExtended' }],
		},
		{
			title: 'Meer tips',
			name: 'tipCollection',
			type: 'tipSelector',
		},
		{
			title: 'Bronnen',
			name: 'sources',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
					description:
						'Indien titel leeg word gelaten wordt `Bronnen` in siteSettings getoond',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
			],
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title.nl',
			},
		},
	],
	preview: {
		select: {
			title: 'header.title.nl',
			subtitle: 'slug.current',
		},
	},
};
