export default {
	title: 'Thema’s',
	name: 'theme-document',
	type: 'document',
	fields: [
		{
			title: 'Naam',
			name: 'name',
			type: 'localeString',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name.nl',
			},
		},
		{ title: 'Icoon', name: 'icon', type: 'image' },
	],
	preview: {
		select: {
			title: 'name.nl',
			subtitle: 'slug.current',
			media: 'icon',
		},
	},
};
