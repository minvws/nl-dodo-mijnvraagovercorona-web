export default {
	title: 'Thema’s',
	name: 'theme-document',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Overzicht',
			name: 'overview',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{ title: 'Icoon', name: 'icon', type: 'image' },
			],
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
					title: 'Chapeau',
					name: 'chapeau',
					type: 'localeString',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
				{
					title: 'Illustratie',
					name: 'image',
					type: 'image',
				},
			],
		},

		{
			title: 'Flow titel',
			name: 'titleFlow',
			type: 'localeString',
			description: 'Deze titel komt na `X situatie(s)` boven de startpunten',
		},
		{
			title: 'Vraag startpunten',
			name: 'questionCollection',
			type: 'questionSelector',
		},
		{
			title: 'Hulp',
			name: 'assistanceReference',
			type: 'reference',
			to: [{ type: 'assistance-document' }],
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
			title: 'overview.title.nl',
			subtitle: 'slug.current',
			media: 'overview.icon',
		},
	},
};
