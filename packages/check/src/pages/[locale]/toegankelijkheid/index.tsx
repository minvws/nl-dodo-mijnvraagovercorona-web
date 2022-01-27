import { ContentPage } from 'components/content-page';

import {
	ContentPageProps,
	getContentPageQuery,
	Locales,
} from '@quarantaine/common';
import { locales } from 'content/general-content';

const Toegankelijkheid = ({ page, siteSettings, locale }: ContentPageProps) => (
	<ContentPage page={page} siteSettings={siteSettings} locale={locale} />
);

export const getStaticProps = async ({
	params: { locale },
}: {
	params: { locale: Locales };
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
	paths: locales.map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});

export default Toegankelijkheid;
