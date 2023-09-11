import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'Homepage',
	name: 'homepage',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
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
			options: {
				collapsible: true,
				collapsed: true,
			},
		}),

		defineField({
			title: 'Meest gestelde vragen',
			name: 'cards',
			type: 'cards',
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
					title: 'Met filter?',
					name: 'filter',
					type: 'boolean',
				}),
				defineField({
					title: 'Vraag startpunten',
					name: 'ctaButtonCollection',
					type: 'ctaButtonSelectorWithCategories',
				}),
			],
		}),

		defineField({
			title: 'Snel naar:',
			name: 'moreInfo',
			type: 'moreInfo',
		}),

		defineField({
			title: 'Huidige adviezen',
			name: 'currentAdvice',
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
					validation: (Rule) => Rule.required(),
				}),

				defineField({
					title: 'Subtitle',
					name: 'content',
					type: 'customBlock',
				}),

				defineField({
					title: 'JA Advies',
					name: 'adviceYes',
					type: 'adviceBlock',
				}),

				defineField({
					title: 'NEE advies',
					name: 'adviceNo',
					type: 'adviceBlock',
				}),
			],
		}),

		defineField({
			title: 'Verhalen',
			name: 'taleCollection',
			type: 'taleSelector',
		}),

		defineField({
			title: 'Hulp',
			name: 'assistance',
			type: 'reference',
			to: [{ type: 'assistance-new' }],
			options: {
				filter: filterReferenceByLanguage,
			},
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
