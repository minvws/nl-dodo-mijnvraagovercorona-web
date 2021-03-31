export default {
	title: 'Check Wanneer Pagina',
	name: 'wanneer-page',
	type: 'document',
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Header in de buurt',
			name: 'headerBuurt',
			type: 'header',
		},
		{
			title: 'Header melding app',
			name: 'headerMeldingApp',
			type: 'header',
		},
		{
			title: 'Header reis',
			name: 'headerReis',
			type: 'header',
		},
		{
			title: 'Header corona zonder klachten',
			name: 'headerCoronaZonderKlachten',
			type: 'header',
		},
		{
			title: 'Header corona met klachten',
			name: 'headerCoronaMetKlachten',
			type: 'header',
		},
		{
			title: 'Header huisgenoot afstand houden',
			name: 'headerHuisgenootAfstand',
			type: 'header',
		},
		{
			title: 'Header huisgenoot geen afstand houden',
			name: 'headerHuisgenootGeenAfstand',
			type: 'header',
		},
		{
			title: 'Terug tekst',
			name: 'terugTekst',
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
			title: 'Button',
			name: 'button',
			type: 'localeString',
		},
		{
			title: 'URL',
			name: 'url',
			type: 'string',
		},
	],
};
