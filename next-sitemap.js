const locale = process.env.NEXT_PUBLIC_LOCALE;
const isDefaultLocale = locale === 'nl';

module.exports = {
	siteUrl: `https://reizentijdenscorona.rijksoverheid.nl${
		!isDefaultLocale ? `/${locale}` : ''
	}`,
	exclude: ['**/geen-advies'],
	...(isDefaultLocale
		? {
				generateRobotsTxt: true,
				robotsTxtOptions: {
					additionalSitemaps: [
						'https://reizentijdenscorona.rijksoverheid.nl/en/sitemap.xml',
					],
				},
		  }
		: {}),
};
