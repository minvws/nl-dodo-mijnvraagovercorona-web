import { defineField, defineType } from 'sanity'

import { supportedLocales, Locale } from '../../utilities/locales';

export default defineType({
	title: 'URL met vertalingen',
	name: 'localeURL',
	type: 'object',
	fieldsets: [
		{
			title: 'Vertalingen',
			name: 'translations',
			options: { collapsible: true },
		},
	],
	fields: supportedLocales.map((locale: Locale) => ({
		title: locale.title,
		name: locale.id,
		type: 'url',
		fieldset: locale.isDefault ? null : 'translations',
	})),
});
