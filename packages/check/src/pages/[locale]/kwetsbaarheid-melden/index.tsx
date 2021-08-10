import { ContentPageProps, getContentPageQuery } from '@quarantaine/common';

import { ContentPage } from 'components/content-page';
import { Locale } from 'types/locale';

const KwetsbaarheidMelden = ({
	page,
	siteSettings,
	locale,
}: ContentPageProps) => (
	<ContentPage page={page} siteSettings={siteSettings} locale={locale} />
);

export const getStaticProps = async ({
	params: { locale },
}: {
	params: { locale: Locale };
}) => {
	const { page, siteSettings } = await getContentPageQuery({
		site: 'quarantaine-check',
		type: 'kwetsbaarheid-melden-page',
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

export default KwetsbaarheidMelden;
