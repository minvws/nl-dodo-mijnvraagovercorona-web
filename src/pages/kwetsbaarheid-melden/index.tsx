import { ContentPageProps, getContentPageQuery } from 'utilities/sanity';

import { ContentPage } from 'components/content-page';

const KwetsbaarheidMelden = ({
	page,
	siteSettings,
	locale,
}: ContentPageProps) => (
	<ContentPage page={page} siteSettings={siteSettings} locale={locale} />
);

export const getStaticProps = async () => {
	const { page, siteSettings } = await getContentPageQuery(
		'kwetsbaarheid-melden-page',
	);

	return {
		props: {
			page,
			siteSettings,
			locale: process.env.NEXT_PUBLIC_LOCALE,
		},
	};
};

export default KwetsbaarheidMelden;
