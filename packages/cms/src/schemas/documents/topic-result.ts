export default {
	title: 'Onderwerp Resultaat Documenten',
	name: 'topic-result-document',
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
			type: 'header',
		},
		{
			title: 'Onderwerp',
			name: 'topic',
			type: 'reference',
			to: [{ type: 'topic-document' }],
		},
		{
			title: 'Verhalen',
			name: 'stories',
			type: 'array',
			of: [{ type: 'story' }],
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
			subtitle: 'topic.name.nl',
		},
	},
};
