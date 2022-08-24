import {
	ContentPageProps,
	getContentPageQuery,
	Locales,
	getClient,
} from '@quarantaine/common';

import { ContentPage } from 'components/content-page';
import { locales } from 'content/general-content';

const Copyright = ({
	page,
	siteSettings,
	locale,
	query,
	preview,
}: ContentPageProps) => (
	<ContentPage
		page={page}
		siteSettings={siteSettings}
		locale={locale}
		preview={preview}
		query={query}
	/>
);

export const getStaticProps = async ({
	params: { locale },
	preview = false,
}: {
	params: { locale: Locales };
	preview: boolean;
}) => {
	const query = getContentPageQuery({
		site: 'mijn-vraag-over-corona',
		type: 'copyright-page',
		locale,
	});
	const { page, siteSettings } = await getClient(preview).fetch(query);

	return {
		props: {
			query,
			page,
			siteSettings,
			locale,
			preview,
		},
	};
};

export const getStaticPaths = () => ({
	paths: locales.map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});

export default Copyright;
