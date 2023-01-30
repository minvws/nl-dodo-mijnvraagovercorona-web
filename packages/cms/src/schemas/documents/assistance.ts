import { defineType, defineField } from 'sanity'

export default defineType({
	title: 'Hulp document',
	name: 'assistance-document',
	type: 'document',
	preview: {
		select: {
			title: 'title.nl',
			subtitle: 'phonenumber',
		},
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'localeString',
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Tekst zonder chat',
			name: 'tekstWithoutChat',
			type: 'localeString',
		}),
		defineField({
			title: 'Tekst met chat',
			name: 'tekstWithChat',
			type: 'localeString',
		}),
		defineField({
			title: 'Telefoonnummer',
			name: 'phonenumber',
			type: 'string',
		}),
		defineField({
			title: 'Openingstijden Telefoonnummer',
			name: 'openingHoursPhonenumber',
			type: 'localeString',
		}),
		defineField({
			title: 'Chat',
			name: 'chat',
			type: 'localeString',
		}),
		defineField({
			title: 'Openingstijden',
			name: 'openingHours',
			type: 'localeString',
		}),
		defineField({
			title: 'Open',
			name: 'open',
			type: 'localeString',
		}),
		defineField({
			title: 'Situatie vraag',
			name: 'situationQuestion',
			type: 'localeString',
		}),
		defineField({
			title: 'Situatie button',
			name: 'situationButton',
			type: 'localeString',
		}),
	],
});
