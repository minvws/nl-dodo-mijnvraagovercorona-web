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
			description:
				'wordt alleen weergegeven op pagina’s met een TOC. Wanneer er geen hoofdtitel is ingevoerd word deze titel gebruikt in het overzicht in het CMS',
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
			overviewTitle: 'overview.title.nl',
			media: 'overview.icon',
		},
		prepare(selection) {
			const { title, overviewTitle, media } = selection;
			return {
				title: overviewTitle || title,
				media: media,
			};
		},
	},
};
