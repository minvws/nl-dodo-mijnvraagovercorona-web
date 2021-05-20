export default {
	title: 'Site Settings Document',
	name: 'site-settings-document',
	type: 'document',
	fields: [
		{
			title: 'Site',
			name: 'site',
			type: 'string',
			options: {
				list: ['reizen-tijdens-corona', 'quarantaine-check'],
			},
		},
		{
			title: 'Site URL',
			name: 'baseUrl',
			type: 'string',
		},
		{
			title: 'Pagina titel suffix',
			name: 'pageTitleSuffix',
			type: 'localeString',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Terug',
					name: 'terug',
					type: 'localeString',
				},
				{
					title: 'Opnieuw',
					name: 'opnieuw',
					type: 'localeString',
				},
				{
					title: 'Resultaat',
					name: 'resultaat',
					type: 'localeString',
				},
				{
					title: 'Logo alt text',
					name: 'logoAlt',
					type: 'localeString',
				},
			],
		},
		{
			title: 'Footer',
			name: 'footer',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Onderdelen',
					name: 'items',
					type: 'array',
					of: [
						{
							type: 'object',
							name: 'item',
							title: 'Onderdeel',
							fields: [
								{
									name: 'url',
									title: 'URL',
									type: 'string',
								},
								{
									name: 'content',
									title: 'Content',
									type: 'localeString',
								},
							],
						},
					],
					options: {
						sortable: false,
						editModal: 'popover',
					},
				},
				{
					title: 'Meer informatie titel',
					name: 'meerInformatieTitle',
					type: 'localeString',
				},
				{
					title: 'Rijksoverheid text',
					name: 'rijksoverheidText',
					type: 'localeString',
				},
				{
					title: 'Rijksoverheid link',
					name: 'rijksoverheidUrl',
					type: 'localeURL',
				},
				{
					title: 'Alleen samen alt text',
					name: 'alleenSamenAlt',
					type: 'localeString',
				},
				{
					title: 'Footer tekst',
					name: 'footerText',
					type: 'localeBlock',
				},
			],
		},
		{
			title: 'Privacy',
			name: 'privacy',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'id',
					name: 'id',
					type: 'localeString',
				},
				{
					title: 'USP',
					name: 'usp',
					type: 'localeString',
				},
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Beloftes',
					name: 'beloftes',
					type: 'array',
					of: [{ type: 'localeString' }],
					options: {
						sortable: false,
						editModal: 'popover',
					},
				},
			],
		},
		{
			title: 'Feedback',
			name: 'feedback',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'localeString',
				},
				{
					title: 'Button',
					name: 'button',
					type: 'localeString',
				},
				{
					title: 'URL',
					name: 'url',
					type: 'localeString',
				},
			],
		},
		{
			title: 'Vervoersmiddelen',
			name: 'vervoersmiddelen',
			type: 'array',
			of: [
				{
					title: 'Vervoersmiddel',
					name: 'vervoersmiddel',
					type: 'object',
					preview: {
						select: {
							title: 'naam',
							subtitle: 'uitgebreid.nl',
						},
					},
					fields: [
						{
							title: 'Naam',
							name: 'naam',
							type: 'string',
						},
						{
							title: 'Uitgebreid',
							name: 'uitgebreid',
							type: 'localeString',
						},
					],
				},
			],
		},
		{
			title: 'Quarantaine lijst titel',
			name: 'quarantineOverviewTitle',
			type: 'localeString',
		},
		{
			title: 'Quarantaine Gids',
			name: 'quarantaineGids',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Quarantainegids button',
					name: 'button',
					type: 'localeString',
				},
				{
					title: 'Quarantainegids URL',
					name: 'url',
					type: 'localeString',
				},
				{
					title: 'Quarantainegids text',
					name: 'text',
					type: 'localeString',
				},
			],
		},
		{
			title: 'Quarantaine Agenda',
			name: 'quarantaineCalendar',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{
					title: 'Tot en met',
					name: 'dateSeperator',
					type: 'localeString',
				},
				{
					title: 'Andere agenda',
					name: 'otherCalendar',
					type: 'localeString',
				},
				{ title: 'Agenda titel', name: 'title', type: 'localeString' },
				{ title: 'Modal titel', name: 'modalTitle', type: 'localeString' },
				{ title: 'Modal body', name: 'modalBody', type: 'localeString' },
				{
					title: 'Uitnodiging titel',
					name: 'inviteTitle',
					type: 'localeString',
				},
				{ title: 'Uitnodiging text', name: 'inviteText', type: 'localeString' },
			],
		},
		{
			title: 'Check Opnieuw Invullen Agenda',
			name: 'checkAgainCalendar',
			type: 'object',
			options: { collapsible: true },
			fields: [
				{ title: 'Modal titel', name: 'modalTitle', type: 'localeString' },
				{ title: 'Modal body', name: 'modalBody', type: 'localeString' },
				{
					title: 'Uitnodiging titel',
					name: 'inviteTitle',
					type: 'localeString',
				},
				{ title: 'Uitnodiging text', name: 'inviteText', type: 'localeString' },
			],
		},
		{
			title: 'Print call to action',
			name: 'printCta',
			type: 'localeString',
		},
		{
			title: 'Check opnieuw call to action',
			name: 'checkAgainCta',
			type: 'localeString',
		},
		{
			title: 'Agenda call to action',
			name: 'agendaCta',
			type: 'localeString',
		},
		{
			title: 'Favorieten call to action',
			name: 'favoriteCta',
			type: 'localeString',
		},
		{
			title: 'Speciale instructies GGD',
			name: 'GGDSpecialInstructions',
			type: 'localeString',
		},
	],
};
