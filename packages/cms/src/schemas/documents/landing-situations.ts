export default {
	title: 'Landingpagina situaties',
	name: 'landing-situations-document',
	type: 'document',
	preview: {
		select: {
			title: 'header.title.nl',
			subtitle: 'slug.current',
			media: 'header.image',
		},
	},
	fields: [
		{
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		},
		{
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				{
					title: 'Titel',
					name: 'title',
					type: 'localeString',
				},
				{
					title: 'Chapeau',
					name: 'chapeau',
					type: 'localeString',
				},
				{
					title: 'Content',
					name: 'content',
					type: 'localeBlock',
				},
				{
					title: 'Illustratie',
					name: 'image',
					type: 'image',
				},
			],
		},
		{
			title: 'Vraag referentie',
			name: 'situationReference',
			type: 'reference',
			to: [{ type: 'situation-question-document' }],
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			description:
				'Pas op! Wanneer je dit veld wijzigt hebben we geen redirect vanuit de vorige url.',
			options: {
				source: 'header.title.nl',
			},
			validation: (Rule: any) => Rule.required(),
		},
	],
};
