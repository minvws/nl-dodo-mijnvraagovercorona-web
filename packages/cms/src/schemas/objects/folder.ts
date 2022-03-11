export default {
	title: 'Folder',
	name: 'folder',
	type: 'object',
	preview: {
		select: {
			title: 'title.nl',
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
			title: 'Tekst',
			name: 'content',
			type: 'localeBlock',
		},
		{
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		},
		{
			title: 'Cases',
			name: 'cases',
			type: 'array',
			of: [{ type: 'case' }],
		},
	],
};
