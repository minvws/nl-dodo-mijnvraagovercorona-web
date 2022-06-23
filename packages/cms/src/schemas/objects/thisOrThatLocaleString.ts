export default {
	title: 'Tekst met vertalingen in enkelvoud/meervoud',
	name: 'thisOrThatLocaleString',
	type: 'object',
	options: { collapsible: true },
	fields: [
		{
			title: 'This',
			name: 'this',
			type: 'localeString',
		},
		{
			title: 'That',
			name: 'that',
			type: 'localeString',
		},
	],
};
