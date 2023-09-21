import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';
import { getBlockContentPreview } from '../../utilities/getBlockContentPreview';

export default defineType({
	title: 'CTA knop',
	name: 'cta-button-document',
	type: 'document',
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
	fieldsets: [
		{
			name: 'linkTo',
			title: 'Linkt naar',
			description: 'Vul éen van de typen links in.',
		},
	],
	validation: (Rule) =>
		Rule.custom((fields: any) =>
			!fields?.label
				? true
				: fields?.href || fields?.pageReference
				? true
				: '"Linkt naar" is verplicht',
		),
	fields: [
		defineField({
			title: 'Label',
			name: 'label',
			type: 'customBlock',
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			title: 'Pagina link',
			name: 'pageReference',
			type: 'pageSourceSelector',
			readOnly: ({ parent }) => !!parent?.href,
			fieldset: 'linkTo',
		}),

		defineField({
			name: 'deepLink',
			type: 'taleDeeplink',
			hidden: ({ parent }) => !parent?.pageReference,
			fieldset: 'linkTo',
		}),

		defineField({
			title: 'Href',
			name: 'href',
			type: 'string',
			readOnly: ({ parent }) => !!parent?.pageReference,
			fieldset: 'linkTo',
		}),
	],
});
