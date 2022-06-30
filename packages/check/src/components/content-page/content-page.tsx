import { Page } from 'components/page';

import {
	ContentPageProps,
	Content,
	ContentBlock,
	MetaTags,
	Hero,
} from '@quarantaine/common';

export const ContentPage = ({ page }: ContentPageProps) => (
	<>
		<MetaTags
			title={page.metaData.title}
			description={page.metaData.description}
			shareImage={page.metaData.socialShareImage}
			url={page.url}
		/>

		<Page showBackLink="previous">
			<Hero title={page.title} />
			<Content>
				<ContentBlock content={page.content} />
			</Content>
		</Page>
	</>
);
