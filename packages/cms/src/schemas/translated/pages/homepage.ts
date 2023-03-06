import { string } from 'prop-types';
import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Homepage',
	name: 'homepage',
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
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),
		defineField({
			title: 'Button',
			name: 'button',
			type: 'flexibleButton',
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
			title: 'Advies',
			name: 'advice',
			type: 'reference',
			to: [{ type: 'adviceCard' }],
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
	],
	preview: {
		select: {
			title: 'metaData.title',
			locale: '__i18n_lang',
		},
		prepare(selection) {
			const { title, locale } = selection;
			return {
				title: title,
				subtitle: `${locale}`,
			};
		},
	},
});
