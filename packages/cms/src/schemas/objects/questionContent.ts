import { defineField, defineType } from 'sanity';

export default defineType({
	title: 'Dubbel afbeelding',
	name: 'questionContent',
	type: 'object',
	fields: [
		defineField({
			title: 'Eerste content',
			name: 'contentPrimary',
			type: 'localeBlock',
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			title: 'Eerste afbeelding',
			name: 'imagePrimary',
			type: 'image',
		}),
		defineField({
			title: 'Tweede content',
			name: 'contentSecondary',
			type: 'localeBlock',
			hidden: ({ parent }: { parent: any }) => !parent?.contentPrimary,
		}),
		defineField({
			title: 'Tweede afbeelding',
			name: 'imageSecondary',
			type: 'image',
			hidden: ({ parent }: { parent: any }) => !parent?.contentPrimary,
		}),
	],
});
