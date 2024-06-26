import { defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../utilities/filterReferenceByLanguage';

export default defineField({
	title: 'Pagina referentie',
	description: 'Creëert een interne referentie naar een andere pagina.',
	name: 'pageSourceSelector',
	type: 'reference',
	to: [
		{ type: 'theme-page' },
		{ type: 'generic-page' },
		{ type: 'advice-page' },
		{ type: 'question-page' },
		{ type: 'pza-landing-page' },
		{ type: 'question-landing-page' },
		{ type: 'campaign-page' },
	],
	options: {
		filter: filterReferenceByLanguage,
	},
});
