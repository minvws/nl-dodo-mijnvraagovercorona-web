import { defineType } from 'sanity';

import { supportedLocales, Locale } from '../../utilities/locales';

export default defineType({
	title: 'Text met vertalingen',
	name: 'localeText',
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
		type: 'text',
		rows: 5,
		fieldset: locale.isDefault ? null : 'translations',
	})),
});
