import { defineField } from 'sanity';
import { filterReferenceByLanguage } from '../../../utilities/filterReferenceByLanguage';

export default defineField({
	title: 'Interne pagina referentie',
	description: 'Creëert een interne link naar een andere pagina.',
	name: 'pageReference',
	type: 'reference',
	to: [
		{ type: 'theme-page' },
		{ type: 'generic-page' },
		{ type: 'tip-document' },
	],
	options: {
		filter: filterReferenceByLanguage,
	},
});
