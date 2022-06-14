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
		{
			title: 'Startpunten',
			name: 'entryPoints',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'situation-question-document' }],
				},
			],
		},
	],
	preview: {
		select: {
			title: 'name.nl',
			subtitle: 'slug.current',
			media: 'icon',
		},
	},
};
