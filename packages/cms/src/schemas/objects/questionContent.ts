export default {
	title: 'Dubbel afbeelding',
	name: 'questionContent',
	type: 'object',
	fields: [
		{
			title: 'Eerste content',
			name: 'contentPrimary',
			type: 'localeBlock',
			validation: (Rule: any) => Rule.required(),
		},
		{
			title: 'Eerste afbeelding',
			name: 'imagePrimary',
			type: 'image',
		},
		{
			title: 'Tweede content',
			name: 'contentSecondary',
			type: 'localeBlock',
			hidden: ({ parent }: { parent: any }) => !parent?.contentPrimary,
		},
		{
			title: 'Tweede afbeelding',
			name: 'imageSecondary',
			type: 'image',
			hidden: ({ parent }: { parent: any }) => !parent?.contentPrimary,
		},
	],
};
