import { isUniqueInLocale } from '../../utilities/isUniqueInLocale';
import { defineType, defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

async function isUnique(slug: any, context: any) {
	return await isUniqueInLocale({
		slug,
		context,
		type: 'campaign-page',
	});
}

export default defineType({
	title: 'Campagne pagina',
	name: 'campaign-page',
	type: 'document',
	initialValue: {
		__i18n_lang: 'nl',
	},
	fieldsets: [
		{ name: 'urlStructure', title: 'Url structuur' },
		{
			title: 'Verhalen',
			name: 'tales',
		},
	],
	fields: [
		defineField({
			title: 'Meta data',
			name: 'metaData',
			type: 'metaData',
		}),

		defineField({
			title: 'Overzicht',
			name: 'overview',
			type: 'overview',
		}),

		defineField({
			title: 'Kruimelpad titel',
			name: 'breadcrumbTitle',
			type: 'string',
			description: 'Verkorte kruimelpad titel (optioneel)',
		}),

		defineField({
			title: 'Toon het feedback blok',
			name: 'showFeedback',
			type: 'boolean',
			description: 'Als deze toggle aan staat genereren we een feedback blok.',
		}),

		defineField({
			title: 'Hero',
			name: 'hero',
			type: 'hero',
		}),

		defineField({
			title: 'Verhalen',
			description: 'Verhalen op deze pagina worden getoond als een accordion',
			name: 'taleCollection',
			type: 'taleSelector',
			fieldset: 'tales',
		}),

		defineField({
			title: 'Carousel ',
			name: 'carousel',
			type: 'object',
			fields: [
				defineField({
					title: 'Titel',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Carousel items',
					name: 'carouselItems',
					type: 'array',
					description: 'Voeg carousel items toe',
					of: [
						{
							title: 'Item',
							name: 'carouselItem',
							type: 'reference',
							to: [{ type: 'carousel' }],
							options: {
								filter: filterReferenceByLanguage,
							},
						},
					],
					validation: (Rule) =>
						Rule.custom((items) => {
							if (!items) return true;
							return items.length === 0 || items.length >= 5
								? true
								: 'Een carousel moet minmaal 5 items hebben';
						}),
				}),
			],
		}),

		defineField({
			title: 'Hulp per onderwerp',
			name: 'support',
			type: 'reference',
			to: [{ type: 'support' }],
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
			title: 'Sub pagina referentie',
			description:
				'Genereert deze pagina onder een andere pagina in de hierachie',
			name: 'subFolderReference',
			type: 'pageSourceSelector',
			fieldset: 'urlStructure',
		}),

		defineField({
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			fieldset: 'urlStructure',
			validation: (Rule) => Rule.required(),
			options: {
				source: 'metaData.title',
				isUnique: isUnique,
			},
		}),
	],
	preview: {
		select: {
			title: 'hero.title',
			locale: '__i18n_lang',
			slug: 'slug.current',
			subFolderReferenceSlug: 'subFolderReference.slug.current',
			media: 'hero.image',
		},
		prepare(selection) {
			const { title, locale, slug, subFolderReferenceSlug, media } = selection;
			return {
				title: title,
				subtitle: `/${locale}${
					subFolderReferenceSlug ? `/…/${subFolderReferenceSlug}` : ''
				}/${slug}`,
				media,
			};
		},
	},
});
