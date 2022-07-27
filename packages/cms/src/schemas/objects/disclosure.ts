export default {
	title: 'Onhulling',
	name: 'disclosure',
	type: 'object',
	preview: {
		select: {
			title: 'label.this.nl',
		},
	},
	fields: [
		{
			title: 'Label',
			name: 'label',
			type: 'thisOrThatLocaleString',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		},
	],
};
