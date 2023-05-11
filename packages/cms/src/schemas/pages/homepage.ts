import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineType({
	title: 'Homepage',
	name: 'homepage',
	type: 'document',
	i18n: true,
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
			title: 'Meest gestelde vragen',
			name: 'cards',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: true,
			},
			fields: [
				defineField({
					title: 'Label',
					name: 'label',
					type: 'string',
					description:
						'Dit veld word alleen getoond voor screenreader gebruikers',
					readOnly: ({ parent }) => !parent?.items?.length,
					validation: (Rule) =>
						Rule.custom((label, context) =>
							!context.document.cards?.items?.length
								? true
								: label && label.length >= 1
								? true
								: 'Label verplicht',
						),
				}),
				defineField({
					title: 'Kaarten',
					name: 'items',
					type: 'array',
					of: [
						{
							title: 'Card',
							name: 'card',
							type: 'reference',
							to: [{ type: 'card' }],
							options: {
								filter: filterReferenceByLanguage,
							},
						},
					],
					validation: (Rule) =>
						Rule.custom((items) => {
							if (!items) return true;
							return items.length === 0 ||
								(items.length >= 2 && items.length <= 3)
								? true
								: 'Het moet minmaal 2, maximaal 3 items bevatten';
						}),
				}),
			],
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
					type: 'ctaButtonSelector',
				}),
			],
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
			title: 'Tales',
			name: 'taleCollection',
			type: 'taleSelector',
		}),

		defineField({
			title: 'Hulp',
			name: 'assistance',
			type: 'reference',
			to: [{ type: 'assistance' }],
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
