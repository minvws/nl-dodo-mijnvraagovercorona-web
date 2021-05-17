export default {
	title: 'Reis Fase Documenten',
	name: 'travel-fase-document',
	type: 'document',
	fields: [
		{
			title: 'Naam',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Label',
			name: 'label',
			type: 'string',
		},
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'label',
		},
	},
};
