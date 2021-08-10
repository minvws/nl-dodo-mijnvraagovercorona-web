import { ContentPage } from 'components/content-page';

import { ContentPageProps, getContentPageQuery } from '@quarantaine/common';
import { Locale } from 'types/locale';

const Toegankelijkheid = ({ page, siteSettings, locale }: ContentPageProps) => (
	<ContentPage page={page} siteSettings={siteSettings} locale={locale} />
);

export const getStaticProps = async ({
	params: { locale },
}: {
	params: { locale: Locale };
}) => {
	const { page, siteSettings } = await getContentPageQuery({
		site: 'quarantaine-check',
		type: 'toegankelijkheid-page',
		locale,
	});

	return {
		props: {
			page,
			siteSettings,
			locale,
		},
	};
};

export const getStaticPaths = () => ({
	paths: ['nl', 'en'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});

export default Toegankelijkheid;
