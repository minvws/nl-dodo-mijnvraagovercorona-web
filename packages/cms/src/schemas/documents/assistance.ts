export default {
	title: 'Hulp document',
	name: 'assistance-document',
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
			title: 'Tekst',
			name: 'tekst',
			type: 'localeString',
		},
		{
			title: 'Telefoonnummer',
			name: 'phonenumber',
			type: 'string',
		},
		{
			title: 'Openingstijden',
			name: 'openingHouts',
			type: 'localeBlock',
		},
	],
};
