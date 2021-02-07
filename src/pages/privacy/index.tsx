/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import sanity from 'utilities/sanity';

import MetaTags from 'components/meta/MetaTags';
import { Content, Page } from 'components/structure/Page';
import { ContentBlock } from 'components/content-block/ContentBlock';

const query = `*[_type == "privacy-page"]`;

interface PrivacyProps {
	page: {
		metaData: {
			title: {
				nl: string;
				en: string;
			};
			description: {
				nl: string;
				en: string;
			};
		};
		title: {
			nl: string;
			en: string;
		};
		content: {
			nl: Array<Object>;
			en: Array<Object>;
		};
	};
	locale: 'nl' | 'en';
}

const Privacy = ({ page, locale }: PrivacyProps) => (
	<>
		<MetaTags
			title={`${page.metaData.title[locale]} | Quarantaine Reischeck | Rijksoverheid.nl`}
			description={page.metaData.description[locale]}
			url="/privacy"
		/>

		<Page title={page.title[locale]} showBackLink="previous">
			<Content>
				<ContentBlock content={page.content[locale]} />
			</Content>
		</Page>
	</>
);

export const getStaticProps = async ({
	params,
}: {
	params: { locale?: 'nl' | 'en' };
}) => {
	const [page] = await sanity.fetch(query);

	return {
		props: { page, locale: params?.locale || 'nl' },
	};
};

export default Privacy;
