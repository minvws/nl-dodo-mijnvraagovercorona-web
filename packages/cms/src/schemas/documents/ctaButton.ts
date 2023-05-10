import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';
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
			label: 'label',
			referenceTitle: '__i18n_base.label',
			pageReferenceSlug: 'pageReference.slug.current',
			href: 'href',
		},
		prepare(selection) {
			const { label, referenceTitle, pageReferenceSlug, href } = selection;
			const labelPreview = getBlockContentPreview(label);
			const referencePreview = getBlockContentPreview(referenceTitle);

			return {
				title: labelPreview || 'Geen titel',
				subtitle: `${referencePreview ? `${referencePreview} - ` : ''}${
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
			name: 'deepLink',
			type: 'taleDeeplink',
			hidden: ({ parent }) => !parent?.pageReference,
		}),

		defineField({
			title: 'Href',
			name: 'href',
			type: 'string',
			readOnly: ({ parent }) => !!parent?.pageReference,
		}),

		defineField({
			title: 'Categorisering',
			name: 'themes',
			type: 'array',
			of: [
				defineField({
					title: 'Thema',
					name: 'themeReference',
					type: 'reference',
					to: [{ type: 'theme-page' }],
					options: {
						filter: filterReferenceByLanguage,
					},
				}),
			],
		}),
	],
});
