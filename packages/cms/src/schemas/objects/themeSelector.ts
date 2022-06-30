export default {
	title: 'Thema’s',
	name: 'themeSelector',
	type: 'array',
	of: [
		{
			type: 'reference',
			to: [{ type: 'theme-document' }],
		},
	],
};
