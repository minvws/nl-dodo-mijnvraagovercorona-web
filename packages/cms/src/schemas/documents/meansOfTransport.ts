export default {
	title: 'Vervoersmethode Documenten',
	name: 'means-of-transport-document',
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
