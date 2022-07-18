export default {
	title: 'Video',
	name: 'video',
	type: 'object',
	fields: [
		{
			title: 'Video embed URL',
			name: 'url',
			type: 'url',
		},
		{
			title: 'Cover image',
			name: 'image',
			type: 'image',
		},
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
			description: 'Word getoond/voorgelezen aan screenreader gebruikers',
		},
	],
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'url',
			icon: 'image',
		},
	},
};
