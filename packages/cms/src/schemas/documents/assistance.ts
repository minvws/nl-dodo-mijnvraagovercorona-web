import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Hulp document',
	name: 'assistance',
	type: 'document',
	i18n: true,
	initialValue: {
		__i18n_lang: 'nl',
	},
	preview: {
		select: {
			title: 'title',
			phone: 'phonenumber',
			locale: '__i18n_lang',
			referenceTitle: '__i18n_base.title',
		},
		prepare(selection) {
			const { title, phone, locale, referenceTitle } = selection;
			return {
				title: title,
				subtitle: `${phone} - ${
					referenceTitle ? `${referenceTitle} - ` : ''
				}${locale}`,
			};
		},
	},
	fields: [
		defineField({
			title: 'Titel',
			name: 'title',
			type: 'string',
		}),
		defineField({
			title: 'Afbeelding',
			name: 'image',
			type: 'image',
		}),
		defineField({
			title: 'Tekst zonder chat',
			name: 'tekstWithoutChat',
			type: 'string',
		}),
		defineField({
			title: 'Tekst met chat',
			name: 'tekstWithChat',
			type: 'string',
		}),
		defineField({
			title: 'Telefoonnummer',
			name: 'phonenumber',
			type: 'string',
		}),
		defineField({
			title: 'Openingstijden Telefoonnummer',
			name: 'openingHoursPhonenumber',
			type: 'string',
		}),
		defineField({
			title: 'Chat',
			name: 'chat',
			type: 'string',
		}),
		defineField({
			title: 'Openingstijden',
			name: 'openingHours',
			type: 'string',
		}),
		defineField({
			title: 'Open',
			name: 'open',
			type: 'string',
		}),
		defineField({
			title: 'Situatie vraag',
			name: 'situationQuestion',
			type: 'string',
		}),
		defineField({
			title: 'Situatie button',
			name: 'situationButton',
			type: 'string',
		}),
		defineField({
			title: 'Hulp nodig?',
			name: 'getHelp',
			type: 'object',
			fields: [
				defineField({
					title: 'Title',
					name: 'title',
					type: 'string',
				}),
				defineField({
					title: 'Knop',
					name: 'button',
					type: 'flexibleButton',
				}),
			],
		}),
	],
});
