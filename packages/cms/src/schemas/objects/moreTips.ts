export default {
	title: 'Meer tips',
	name: 'moreTips',
	type: 'object',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		{
			title: 'Titel',
			name: 'moreTips',
			type: 'localeString',
			description:
				'Indien titel leeg word gelaten wordt `Meer Tips` in siteSettings getoond',
		},
		{
			title: 'Meer tips',
			name: 'tipCollection',
			type: 'tipSelector',
		},
	],
};
