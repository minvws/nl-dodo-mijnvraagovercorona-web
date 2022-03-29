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
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
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
