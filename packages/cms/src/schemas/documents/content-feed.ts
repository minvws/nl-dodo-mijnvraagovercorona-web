import { defineType, defineField } from 'sanity'

export default defineType({	
	title: 'Content Feed',
	name: 'content-feed-document',
	type: 'document',
	preview: {
		select: {
			title: 'overviewTitle',
		},
	},
	fields: [
		defineField({
			title: 'Naam in CMS overzicht',
			name: 'overviewTitle',
			type: 'string',
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			title: 'Content',
			name: 'content',
			type: 'questionContent',
		}),
	],
});