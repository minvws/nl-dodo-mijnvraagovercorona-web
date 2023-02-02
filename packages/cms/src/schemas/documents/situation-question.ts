import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Situatie Vraag Documenten',
	name: 'situation-question-document',
	type: 'document',
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'pageMetaData',
		}),
		defineField({
			title: 'Header',
			name: 'header',
			type: 'header',
		}),
		defineField({
			title: 'Type vraag',
			name: 'type',
			type: 'string',
			options: {
				list: ['datepicker', 'single', 'multiple', 'buttons', 'age'],
			},
		}),
		defineField({
			title: 'Content',
			name: 'contentReference',
			type: 'reference',
			to: [{ type: 'content-feed-document' }],
			hidden: ({ document }: { document: { type: string } }) =>
				document?.type === 'datepicker',
		}),
		defineField({
			title: 'Leeftijdsvraag',
			name: 'ageInput',
			type: 'object',
			fields: [
				defineField({
					title: 'Label',
					name: 'label',
					type: 'localeString',
				}),
				defineField({
					title: 'Placeholder',
					name: 'placeholder',
					type: 'localeString',
				}),
			],
			hidden: ({ document }: { document: { type: string } }) =>
				document?.type !== 'age',
		}),
		defineField({
			title: 'Label',
			name: 'label',
			type: 'localeString',
		}),
		defineField({
			title: 'Antwoorden',
			name: 'answersSingle',
			type: 'array',
			of: [
				{
					title: 'Antwoord',
					name: 'answer',
					type: 'object',
					fields: [
						defineField({
							title: 'Content',
							name: 'content',
							type: 'localeBlock',
						}),
						defineField({
							title: 'Volgende',
							name: 'next',
							type: 'reference',
							to: [
								{ type: 'situation-question-document' },
								{ type: 'situation-result-document' },
							],
						}),
					],
					preview: {
						select: {
							title: 'content.nl',
							subtitle: 'content.next.header.title',
						},
					},
				},
			],
			hidden: ({ document }: { document: { type: string } }) =>
				document?.type !== 'single',
		}),
		defineField(
			{
				title: 'Antwoorden',
				name: 'answersMultiple',
				type: 'array',
				of: [
					{
						title: 'Antwoord',
						name: 'answer',
						type: 'object',
						fields: [
							defineField({
								title: 'Content',
								name: 'content',
								type: 'localeString',
							}),
						],
						preview: {
							select: {
								title: 'content.nl',
								subtitle: 'content.next.header.title',
							},
						},
					},
				],
				hidden: ({ document }: { document: { type: string } }) =>
					document?.type !== 'multiple',
			},
			{
				title: 'Toon meer',
				name: 'showMore',
				type: 'object',
				fields: [
					defineField({
						title: 'Maximum aantal antwoorden',
						name: 'max',
						type: 'number',
					}),
					defineField({
						title: 'Label',
						name: 'label',
						type: 'thisOrThatLocaleString',
					}),
				],
				hidden: ({ document }: { document: { type: string } }) =>
					document?.type !== 'multiple',
			},
		),
		defineField({
			title: 'Buttons',
			name: 'buttons',
			type: 'array',
			of: [
				{
					title: 'Button',
					name: 'button',
					type: 'object',
					fields: [
						defineField({
							title: 'Tekst',
							name: 'text',
							type: 'localeString',
						}),
						defineField({
							title: 'Standaard actie',
							name: 'standard',
							type: 'boolean',
						}),
						defineField({
							title: 'Volgende',
							name: 'next',
							type: 'reference',
							to: [
								{ type: 'situation-question-document' },
								{ type: 'situation-result-document' },
							],
						}),
						defineField({
							title: 'Modal kom je er niet uit',
							name: 'assistanceDialog',
							type: 'boolean',
							description:
								'Er moet een "Hulp" blok gekoppeld zijn aan deze pagina',
						}),
					],
					preview: {
						select: {
							title: 'text.nl',
						},
					},
				},
			],
		}),
		defineField({
			title: 'Hulp',
			name: 'assistanceReference',
			type: 'reference',
			to: [{ type: 'assistance-document' }],
		}),
		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'header.title.nl',
				isUnique: () => true,
			},
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'string',
		}),
	],
	preview: {
		select: {
			title: 'header.title.nl',
			subtitle: 'slug.current',
			media: 'header.image',
		},
	},
});
