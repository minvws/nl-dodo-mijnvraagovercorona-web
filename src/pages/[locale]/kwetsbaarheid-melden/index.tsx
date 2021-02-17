import { ContentPageProps, getContentPageQuery } from 'utilities/sanity';

import { ContentPage } from 'components/content-page';

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
	params: { locale: 'nl' | 'en' };
}) => {
	const { page, siteSettings } = await getContentPageQuery({
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
