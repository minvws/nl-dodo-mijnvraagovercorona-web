import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Tekst in enkelvoud/meervoud',
	name: 'thisOrThatString',
	type: 'object',
	options: { collapsible: true },
	fields: [
		defineField({
			title: 'This',
			name: 'this',
			type: 'string',
		}),
		defineField({
			title: 'That',
			name: 'that',
			type: 'string',
		}),
	],
});
