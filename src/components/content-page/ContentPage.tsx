import { ContentPageProps } from 'utilities/sanity';

import MetaTags from 'components/meta/MetaTags';
import { Content, Page } from 'components/structure/Page';
import { ContentBlock } from 'components/content-block/ContentBlock';

export const ContentPage = ({ page }: ContentPageProps) => (
	<>
		<MetaTags
			title={page.metaData.title}
			description={page.metaData.description}
			url={page.url}
		/>

		<Page title={page.title} showBackLink="previous">
			<Content>
				<ContentBlock content={page.content} />
			</Content>
		</Page>
	</>
);
