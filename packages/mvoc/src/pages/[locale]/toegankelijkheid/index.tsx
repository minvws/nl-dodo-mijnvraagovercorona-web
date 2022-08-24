import { ContentPage } from 'components/content-page';

import {
	ContentPageProps,
	getClient,
	getContentPageQuery,
	Locales,
} from '@quarantaine/common';
import { locales } from 'content/general-content';

const Toegankelijkheid = ({
	page,
	siteSettings,
	locale,
	preview,
	query,
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
		type: 'toegankelijkheid-page',
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

export default Toegankelijkheid;
