export default {
	title: 'Tekst met vertalingen in enkelvoud/meervoud',
	name: 'pluralLocaleString',
	type: 'object',
	options: { collapsible: true },
	fields: [
		{
			title: 'Enkelvoud',
			name: 'singular',
			type: 'localeString',
		},
		{
			title: 'Meervoud',
			name: 'plural',
			type: 'localeString',
		},
	],
};
