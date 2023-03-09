export const filterReferenceByLanguage = ({ document }) => ({
	filter: '!defined(__i18n_lang) || __i18n_lang == $lang',
	params: {
		lang: document.__i18n_lang,
	},
});
