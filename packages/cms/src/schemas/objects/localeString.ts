import { supportedLocales, Locale } from '../../utilities/locales';

export default {
	title: 'Text met vertalingen',
	name: 'localeString',
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
		type: 'string',
		fieldset: locale.isDefault ? null : 'translations',
	})),
};
