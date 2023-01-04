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

		// masthead
		{
			title: 'Navigatiebalk',
			name: 'masthead',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Menu',
					name: 'menu',
					type: 'object',
					fields: [
						{
							title: 'Home label',
							name: 'homeLabel',
							type: 'string',
						},
						{
							title: 'Interne links',
							name: 'internalPageCollection',
							type: 'internalPageSelector',
						},
					],
				},

				{
					title: 'Skiplink',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'skipLink',
					type: 'string',
				},
			],
		},

		// mastfoot
		{
			title: 'Footer',
			name: 'mastfoot',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Titel',
					name: 'title',
					description: 'Word alleen getoond voor screenreader gebruikers',
					type: 'string',
				},
				{
					title: 'Kolommen',
					name: 'columns',
					type: 'array',
					validation: (Rule) => Rule.min(1).max(3),
					of: [
						{
							type: 'object',
							name: 'column',
							title: 'Kolom',
							fields: [
								{
									name: 'title',
									title: 'Titel',
									type: 'string',
								},
								{
									name: 'content',
									title: 'Content',
									type: 'customBlock',
								},
								{
									title: 'Interne links',
									name: 'internalPageCollection',
									type: 'internalPageSelector',
								},
							],
						},
					],
				},
			],
		},

		// Language selector
		{
			title: 'Taal selector',
			name: 'localeSelector',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'string',
				},
				{
					title: 'Wissel van taal',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'change',
					type: 'string',
				},
				{
					title: 'Huidige taal',
					description: 'Word alleen getoond voor screenreader gebruikers',
					name: 'current',
					type: 'string',
				},
			],
		},

		// logo
		{
			title: 'Logo',
			name: 'logo',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Alternatief',
					name: 'alt',
					type: 'string',
				},
			],
		},
	],
};
