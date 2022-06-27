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
			title: 'Tekst zonder chat',
			name: 'tekstWithoutChat',
			type: 'localeString',
		},
		{
			title: 'Tekst met chat',
			name: 'tekstWithChat',
			type: 'localeString',
		},
		{
			title: 'Telefoonnummer',
			name: 'phonenumber',
			type: 'string',
		},
		{
			title: 'Chat',
			name: 'chat',
			type: 'localeString',
		},
		{
			title: 'Openingstijden',
			name: 'openingHours',
			type: 'localeString',
		},
		{
			title: 'Open',
			name: 'open',
			type: 'localeString',
		},
		{
			title: 'Situatie vraag',
			name: 'situationQuestion',
			type: 'localeString',
		},
		{
			title: 'Situatie button',
			name: 'situationButton',
			type: 'localeString',
		},
	],
};
