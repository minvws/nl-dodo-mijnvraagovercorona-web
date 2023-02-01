export default {
	title: 'Modals',
	name: 'modals',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	preview: {
		select: {
			title: 'title',
			subtitle: '__i18n_lang',
		},
	},
	fields: [
		{
			title: 'Titel',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'customBlockWithoutModal',
		},
	],
};
