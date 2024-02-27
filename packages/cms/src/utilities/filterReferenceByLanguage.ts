export const filterReferenceByLanguage = ({ document }) => ({
	filter: '(__i18n_lang == $lang)',
	params: {
		lang: document.__i18n_lang,
	},
});
