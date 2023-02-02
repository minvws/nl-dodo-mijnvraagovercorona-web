import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Thema’s',
	name: 'themeSelector',
	type: 'array',
	of: [
		{
			type: 'reference',
			to: [{ type: 'theme-document' }],
		},
	],
});
