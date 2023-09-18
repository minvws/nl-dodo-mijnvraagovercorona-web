import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Carousel item',
	name: 'carousel',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	fieldsets: [
		{
			name: 'linkTo',
			title: 'Linkt naar',
			description: 'Vul éen van de drie typen links in.',
		},
	],
	preview: {
		select: {
			title: 'headline',
			locale: '__i18n_lang',
			referenceTitle: '__i18n_base.title',
		},
		prepare(selection) {
			const { title, locale, referenceTitle } = selection;
			return {
				title: title,
				subtitle: `${referenceTitle ? referenceTitle : locale}`,
			};
		},
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'headline',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
			description: 'Carousel cover afbeelding',
		}),
		defineField({
			title: 'Label openen carousel item',
			name: 'openItem',
			type: 'string',
		}),
		defineField({
			title: 'Interne link',
			description: 'Creëert een interne link naar een andere pagina.',
			name: 'pageReference',
			type: 'pageSourceSelector',
			readOnly: ({ parent }) =>
				!!parent?.multiContentBlocks || !!parent?.href || !!parent?.asset,
			fieldset: 'linkTo',
		}),
		defineField({
			name: 'deepLink',
			type: 'taleDeeplink',
			hidden: ({ parent }) => !parent?.pageReference,
			fieldset: 'linkTo',
		}),
		defineField({
			title: 'href',
			name: 'href',
			type: 'string',
			readOnly: ({ parent }) =>
				!!parent?.multiContentBlocks ||
				!!parent?.pageReference ||
				!!parent?.asset,
			fieldset: 'linkTo',
		}),
		defineField({
			title: 'Bestand',
			name: 'asset',
			type: 'file',
			readOnly: ({ parent }) =>
				!!parent?.multiContentBlocks ||
				!!parent?.pageReference ||
				!!parent?.href,
			fieldset: 'linkTo',
		}),
		defineField({
			title: 'Content blokken',
			name: 'multiContentBlocks',
			type: 'multiContentBlocks',
			readOnly: ({ parent }) =>
				!!parent?.pageReference || !!parent?.href || !!parent?.asset,
		}),
	],
});
