import { Page } from 'components/page';

import {
	ContentPageProps,
	Content,
	ContentBlock,
	MetaTags,
	Hero,
	usePreviewSubscription,
} from '@quarantaine/common';

export const ContentPage = ({
	page: serverPage,
	preview,
	siteSettings,
	query,
	locale,
}: ContentPageProps) => {
	const {
		data: { page: previewPage },
	} = usePreviewSubscription(query, {
		params: { locale },
		initialData: { page: serverPage, siteSettings },
		enabled: preview,
	});

	const page = previewPage || serverPage;

	return (
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
};
