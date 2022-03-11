export default {
	title: 'Case',
	name: 'case',
	type: 'object',
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'pretitle.nl',
			media: 'image',
		},
	},
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Titel suffix',
			name: 'titleSuffix',
			type: 'localeString',
		},
		{
			title: 'Intro',
			name: 'intro',
			type: 'localeString',
		},
		{
			title: 'Lees meer knop',
			name: 'readMoreLabel',
			type: 'localeString',
		},
		{
			title: 'ContentBlocks',
			name: 'contentBlocks',
			type: 'contentBlocks',
		},
	],
};
