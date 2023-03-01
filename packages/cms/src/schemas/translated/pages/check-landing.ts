import { string } from 'prop-types';
import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Check Landing Pagina',
	name: 'check-landing',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	fieldsets: [
		{
			name: 'situations',
			title: 'Situaties',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
		}),
		defineField({
			title: 'Header',
			name: 'header',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Chapeau',
					name: 'chapeau',
					type: 'string',
				}),
				defineField({
					title: 'Subtitel',
					name: 'subtitle',
					type: 'string',
				}),
				defineField({
					title: 'Illustratie',
					name: 'image',
					type: 'image',
				}),
			],
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),
		defineField({
			title: 'Nu belangrijk',
			name: 'important',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Uitleg',
					name: 'content',
					type: 'customBlock',
				}),
				defineField({
					title: 'Icoon',
					name: 'icon',
					type: 'image',
				}),
				defineField({
					title: 'Vraag startpunten',
					name: 'questionCollection',
					type: 'questionSelector',
				}),
			],
		}),
		defineField({
			title: 'Themas',
			name: 'themes',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Uitleg',
					name: 'content',
					type: 'customBlock',
				}),
				defineField({
					title: 'Thema’s',
					name: 'themeCollection',
					type: 'themeSelector',
				}),
			],
		}),
		defineField({
			title: 'Hulp',
			name: 'assistanceReference',
			type: 'reference',
			to: [{ type: 'assistance-document' }],
		}),
		defineField({
			title: 'Feedback',
			name: 'feedback',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({ title: 'Titel', name: 'title', type: 'string' }),
				defineField({ title: 'Button', name: 'button', type: 'string' }),
			],
		}),
		defineField({
			title: 'URL',
			name: 'url',
			type: 'string',
		}),
	],
});
