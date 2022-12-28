export default {
	title: 'Site Settings',
	name: 'siteSettings',
	i18n: true,
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	fields: [
		{
			title: 'Site URL',
			name: 'baseUrl',
			type: 'string',
		},
		{
			title: 'Pagina titel suffix',
			name: 'pageTitleSuffix',
			type: 'string',
		},
	],
};
