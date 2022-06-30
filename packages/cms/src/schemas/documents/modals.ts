export default {
	title: 'Modals',
	name: 'modals-document',
	type: 'document',
	preview: {
		select: {
			title: 'title.nl',
		},
	},
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlockWithoutModal',
		},
	],
};
