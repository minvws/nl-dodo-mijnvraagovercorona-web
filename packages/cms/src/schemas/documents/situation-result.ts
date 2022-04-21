export default {
	title: 'Situatie Resultaat Documenten',
	name: 'situation-result-document',
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
			to: [{ type: 'situation-flow-document' }],
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title.nl',
				isUnique: () => true,
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
