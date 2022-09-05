export default {
	title: 'Story',
	name: 'story-document',
	type: 'document',
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Content Blocks',
			name: 'contentBlocks',
			type: 'contentBlocks',
		},
		{
			title: 'Overzicht',
			name: 'overview',
			type: 'object',
			description: 'wordt alleen weergegeven op pagina’s met een TOC',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Icoon',
					name: 'icon',
					type: 'image',
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'overview.title.nl',
			media: 'overview.icon',
		},
	},
};
