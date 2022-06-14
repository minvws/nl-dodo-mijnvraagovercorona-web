export default {
	title: 'Vraag startpunten',
	name: 'questionSelector',
	type: 'array',
	of: [
		{
			type: 'reference',
			to: [{ type: 'situation-question-document' }],
		},
	],
};
