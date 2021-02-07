const locales = ['nl', 'en'];

module.exports = {
	exportPathMap(defaultPathMap) {
		const pathMap = {};

		console.log(defaultPathMap);

		Object.entries(defaultPathMap).forEach(([key, value]) => {
			pathMap[key] = value;

			locales.forEach((locale) => {
				pathMap[`/${locale}${key}`] = { ...value, query: { locale } };
			});
		});

		console.log(pathMap);

		return pathMap;
	},
};
