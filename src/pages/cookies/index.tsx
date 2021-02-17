import { ContentPageProps, getContentPageQuery } from 'utilities/sanity';

import { ContentPage } from 'components/content-page';

const Cookies = ({ page, siteSettings, locale }: ContentPageProps) => (
	<ContentPage page={page} siteSettings={siteSettings} locale={locale} />
);

export const getStaticProps = async () => {
	const { page, siteSettings } = await getContentPageQuery('cookies-page');

	return {
		props: {
			page,
			siteSettings,
			locale: process.env.NEXT_PUBLIC_LOCALE,
		},
	};
};

export default Cookies;
