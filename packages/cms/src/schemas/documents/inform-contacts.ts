export default {
	title: 'Contacten informeren document',
	name: 'inform-contacts-document',
	type: 'document',
	preview: {
		select: {
			title: 'title.nl',
		},
	},
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Stappen',
			name: 'steps',
			type: 'steps',
		},
		{
			title: 'Pre knop Content',
			name: 'preButtonContent',
			type: 'localeBlock',
		},
	],
};
