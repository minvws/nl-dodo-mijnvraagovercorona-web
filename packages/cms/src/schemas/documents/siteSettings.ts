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
				list: ['reizen-tijdens-corona', 'mijn-vraag-over-corona'],
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
			title: 'Social share image',
			name: 'socialShareImage',
			description: '1200x632, geen SVG',
			type: 'image',
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
				{
					title: 'Skiplink',
					name: 'skipLink',
					type: 'localeString',
				},
				{
					title: 'Taal selector',
					name: 'localeSelector',
					type: 'object',
					fields: [
						{
							title: 'Wissel van taal',
							name: 'change',
							type: 'localeString',
						},
						{
							title: 'Huidige taal',
							name: 'current',
							type: 'localeString',
						},
					],
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
					title: 'Footer hoofdtitel',
					name: 'footerMainTitle',
					description:
						'Deze titel word alleen getoond voor screenreader gebruikers',
					type: 'localeString',
				},
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
					title: 'Bedank',
					name: 'thanks',
					type: 'localeString',
				},
				{
					title: 'URL',
					name: 'url',
					type: 'localeString',
				},
				{
					title: 'labels',
					name: 'labels',
					type: 'object',
					fields: [
						{
							title: 'Ja',
							name: 'like',
							type: 'localeString',
						},
						{
							title: 'Nee',
							name: 'dislike',
							type: 'localeString',
						},
					],
				},
			],
		},
		{
			title: 'CTA block',
			name: 'ctaBlock',
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
					title: 'Knop label',
					name: 'label',
					type: 'localeString',
				},
				{
					title: 'Knop url',
					name: 'url',
					type: 'string',
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
					title: 'Quarantainegids onderdeel titel',
					name: 'title',
					type: 'localeString',
				},
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
			title: 'Print call to action',
			name: 'printCta',
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
		{
			title: 'Datum kiestekst',
			name: 'datumKiesTekst',
			type: 'localeString',
		},
		{
			title: 'Maanden',
			name: 'maanden',
			type: 'array',
			of: [
				{
					title: 'Maand',
					name: 'maand',
					type: 'localeString',
				},
			],
		},
		{
			title: 'Dagen',
			name: 'dagen',
			type: 'array',
			of: [
				{
					title: 'Dag',
					name: 'dag',
					type: 'localeString',
				},
			],
		},
		{
			title: 'Over',
			name: 'in',
			type: 'localeString',
		},
		{
			title: 'Dag',
			name: 'dayPlural',
			type: 'thisOrThatLocaleString',
		},
		{
			title: 'Geleden',
			name: 'ago',
			type: 'localeString',
		},
		{
			title: 'Vandaag',
			name: 'today',
			type: 'localeString',
		},
		{
			title: 'Meer dan',
			name: 'moreThan',
			type: 'localeString',
		},
		{
			title: 'Laatst bijgewerkt',
			name: 'updatedAt',
			type: 'localeString',
		},
		{
			title: 'Advies ernstige klachten',
			name: 'severeSymptomsAdvice',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Subtitel',
					name: 'subtitle',
					type: 'localeString',
				},
				{
					title: 'Icoon',
					name: 'icon',
					type: 'image',
				},
			],
		},
		{
			title: 'Situatie enkelvoud/meervoud',
			name: 'situationPlural',
			type: 'thisOrThatLocaleString',
		},
		{
			title: 'Bekijk nog X',
			name: 'seeMoreExpand',
			type: 'thisOrThatLocaleString',
		},
		{
			title: 'Bronnen',
			name: 'sources',
			type: 'localeString',
		},
		{
			title: 'Meer Tips',
			name: 'moreTips',
			type: 'localeString',
		},
		{
			title: 'Vervangende variabelen',
			name: 'contentVariables',
			type: 'object',
			fields: [
				{
					title: 'Vaccinatie jaartal',
					name: 'vaccinatiejaar',
					type: 'string',
				},
			],
		},
		{
			title: 'Toegankelijkheid',
			name: 'accessibility',
			type: 'object',
			fields: [
				{
					title: 'Onzichtbaar label bij externe links',
					name: 'labelExternalLink',
					type: 'localeString',
				},
				{
					title: 'Onzichtbaar label bij inline modals',
					name: 'labelModal',
					type: 'localeString',
				},
				{
					title: 'Onzichtbaar "Sluit" label in modals',
					name: 'labelModalClose',
					type: 'localeString',
				},
			],
		},
	],
};
