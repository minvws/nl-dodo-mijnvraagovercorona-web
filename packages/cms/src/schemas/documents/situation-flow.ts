export default {
	title: 'Situatie Flow Documenten',
	name: 'situation-flow-document',
	type: 'document',
	fields: [
		{
			title: 'Naam',
			name: 'name',
			type: 'localeString',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name.nl',
			},
		},
		{
			title: 'Startpunt',
			name: 'start',
			type: 'reference',
			to: [{ type: 'situation-question-document' }],
		},
	],
	preview: {
		select: {
			title: 'name.nl',
			subtitle: 'slug.current',
		},
	},
};
