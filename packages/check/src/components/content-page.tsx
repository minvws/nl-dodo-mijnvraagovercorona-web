import { Page } from 'components/page';

import {
	ContentPageProps,
	Content,
	ContentBlock,
	MetaTags,
} from '@quarantaine/common';

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
