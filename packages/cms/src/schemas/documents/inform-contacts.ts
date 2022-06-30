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
		{
			title: 'Knoppen',
			name: 'buttons',
			type: 'object',
			fields: [
				{
					title: 'Situatie link',
					name: 'situationReference',
					type: 'reference',
					to: [
						{ type: 'situation-question-document' },
						{ type: 'situation-result-document' },
					],
				},
				{
					title: 'Deel knop',
					name: 'shareButton',
					type: 'object',
					fields: [
						{
							title: 'Label',
							name: 'label',
							type: 'localeString',
						},
						{
							title: 'Bericht',
							name: 'message',
							type: 'localeString',
						},
					],
				},
				{
					title: 'Kopiëren knop',
					name: 'copyButton',
					type: 'object',
					fields: [
						{
							title: 'Label',
							name: 'label',
							type: 'localeString',
						},
						{
							title: 'Label copied',
							name: 'labelCopied',
							type: 'localeString',
						},
					],
				},
			],
		},
	],
};
