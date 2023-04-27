import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'CTA knop',
	name: 'cta-button-document',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	preview: {
		select: {
			title: 'label',
			locale: '__i18n_lang',
			referenceTitle: '__i18n_base.title',
			pageReferenceSlug: 'pageReference.slug.current',
			href: 'href',
		},
		prepare(selection) {
			const { title, locale, referenceTitle, pageReferenceSlug, href } =
				selection;
			return {
				title: title[0]?.children
					? title[0].children
							.filter((child) => child._type === 'span')
							.map((span) => span.text)
							.join('')
					: 'Geen titel',
				subtitle: `${referenceTitle ? `${referenceTitle} - ` : ''}${locale} - ${
					pageReferenceSlug || href
				}`,
			};
		},
	},
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'customBlock',
		}),
		defineField({
			title: 'Pagina link',
			name: 'pageReference',
			type: 'pageSourceSelector',
			readOnly: ({ parent }) => !!parent?.href,
		}),
		defineField({
			title: 'Href',
			name: 'href',
			type: 'string',
			readOnly: ({ parent }) => !!parent?.pageReference,
		}),
	],
});
