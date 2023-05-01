import { defineType, defineField } from 'sanity';
import { getBlockContentPreview } from '../../utilities/getBlockContentPreview';

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
			referenceTitle: '__i18n_base.label',
			pageReferenceSlug: 'pageReference.slug.current',
			href: 'href',
		},
		prepare(selection) {
			const { title, referenceTitle, pageReferenceSlug, href } = selection;
			const referenceTitlePreview = getBlockContentPreview(referenceTitle);
			return {
				title: getBlockContentPreview(title) || 'Geen titel',
				subtitle: `${
					referenceTitlePreview ? `${referenceTitlePreview} - ` : ''
				}${pageReferenceSlug || href}`,
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
