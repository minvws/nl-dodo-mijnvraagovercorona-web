export default {
	title: 'Thema’s',
	name: 'theme-document',
	type: 'document',
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title.nl',
			},
		},
		{ title: 'Icoon', name: 'icon', type: 'image' },
		{
			title: 'Vraag startpunten',
			name: 'questionSelector',
			type: 'questionSelector',
		},
	],
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'slug.current',
			media: 'icon',
		},
	},
};
