import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';

import MetaTags from 'components/meta/MetaTags';
import { Content, Page } from 'components/structure/Page';
import { ContentBlock } from 'components/content-block/ContentBlock';

interface PrivacyProps {
	page: {
		metaData: {
			title: string;
			description: string;
		};
		title: string;
		content: Array<Object>;
	};
	siteSettings: {
		pageTitleSuffix: string;
	};
	locale: 'nl' | 'en';
}

const Privacy = ({ page, siteSettings, locale }: PrivacyProps) => (
	<>
		<MetaTags
			title={`${page.metaData.title}${siteSettings.pageTitleSuffix}`}
			description={page.metaData.description}
			url="/privacy"
			locale={locale}
		/>

		<Page title={page.title} showBackLink="previous">
			<Content>
				<ContentBlock content={page.content} />
			</Content>
		</Page>
	</>
);

export const getStaticProps = async () => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty('title', 'metaData.title')},
			${getLocaleProperty('description', 'metaData.description')},
		},
		${getLocaleProperty('title')},
		${getLocaleProperty('content')},
	}`;
	const { page, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'privacy-page',
			pageProjection,
		}),
	);

	return {
		props: { page, siteSettings, locale: process.env.NEXT_PUBLIC_LOCALE },
	};
};

export default Privacy;
