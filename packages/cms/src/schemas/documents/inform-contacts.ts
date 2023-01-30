import { defineType, defineField } from 'sanity'

export default defineType({	
	title: 'Contacten informeren document',
	name: 'inform-contacts-document',
	type: 'document',
	preview: {
		select: {
			title: 'title.nl',
		},
	},
	fields: [
		defineField({
			title: 'Title',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Stappen',
			name: 'steps',
			type: 'steps',
		}),
		defineField({
			title: 'Pre knop Content',
			name: 'preButtonContent',
			type: 'localeBlock',
		}),
		defineField({
			title: 'Knoppen',
			name: 'buttons',
			type: 'object',
			fields: [
				defineField({
					title: 'Situatie link',
					name: 'situationReference',
					type: 'reference',
					to: [
						{ type: 'situation-question-document' },
						{ type: 'situation-result-document' },
					],
				}),
				defineField({
					title: 'Deel knop',
					name: 'shareButton',
					type: 'object',
					fields: [
						defineField({
							title: 'Label',
							name: 'label',
							type: 'localeString',
						}),
						defineField({
							title: 'Bericht',
							name: 'message',
							type: 'localeString',
						}),
					],
				}),
				defineField({
					title: 'Kopiëren knop',
					name: 'copyButton',
					type: 'object',
					fields: [
						defineField({
							title: 'Label',
							name: 'label',
							type: 'localeString',
						}),
						defineField({
							title: 'Label copied',
							name: 'labelCopied',
							type: 'localeString',
						}),
					],
				}),
			],
		}),
	],
});