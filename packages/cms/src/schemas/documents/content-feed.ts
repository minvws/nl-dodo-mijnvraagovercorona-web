export default {
	title: 'Content Feed',
	name: 'content-feed-document',
	type: 'document',
	preview: {
		select: {
			title: 'overviewTitle',
		},
	},
	fields: [
		{
			title: 'Naam in CMS overzicht',
			name: 'overviewTitle',
			type: 'string',
			validation: (Rule: any) => Rule.required(),
		},
		{
			title: 'Content',
			name: 'content',
			type: 'questionContent',
		},
	],
};
