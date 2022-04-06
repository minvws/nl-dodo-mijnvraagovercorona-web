export default {
	title: 'Onderwerp Documenten',
	name: 'topic-document',
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
			title: 'Startpunt',
			name: 'start',
			type: 'reference',
			to: [{ type: 'topic-question-document' }],
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
