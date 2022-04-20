export default {
	title: 'Verhaal',
	name: 'story',
	type: 'object',
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'pretitle.nl',
			media: 'image',
		},
	},
	fields: [
		{
			title: 'Chapeau',
			name: 'chapeau',
			type: 'localeString',
		},
		{
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		},
		{
			title: 'Content',
			name: 'content',
			type: 'localeBlock',
		},
		{
			title: 'CTA',
			name: 'button',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: false,
			},
			fields: [
				{
					title: 'Label',
					name: 'label',
					type: 'localeString',
				},
				{
					title: 'href',
					name: 'href',
					type: 'localeString',
				},
			],
		},
		{
			title: 'Buttons',
			name: 'buttons',
			type: 'array',
			of: [{ type: 'button' }],
		},
		{
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		},
	],
};
