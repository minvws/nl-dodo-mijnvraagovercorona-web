import { ContentPageProps } from 'utilities/sanity';

import { MetaTags } from 'components/meta';
import { Content, Page } from 'components/structure';
import { ContentBlock } from 'components/content-block';

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
