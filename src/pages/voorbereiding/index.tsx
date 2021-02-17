/** @jsx jsx */
import { jsx } from 'theme-ui';
import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';

import Feedback from 'components/feedback/Feedback';
import MetaTags from 'components/meta/MetaTags';
import PreparationPanel from 'components/preparations/PreparationPanel';
import PreparationPanelListItem from 'components/preparations/PreparationPanelListItem';
import { Content, Page } from 'components/structure/Page';

interface VoorbereidingProps {
	page: {
		metaData: {
			title: string;
			description: string;
		};
		title: string;
		saveCopy: string;
		url: string;
	};
	siteSettings: {
		pageTitleSuffix: string;
	};
	documents: {
		title: string;
		image: string;
		description: string;
		items: {
			title: string;
			description?: string;
		}[];
	}[];
	locale: 'nl' | 'en';
}

const VoorbereidingPage = ({
	page,
	siteSettings,
	locale,
	documents,
}: VoorbereidingProps) => (
	<>
		<MetaTags
			title={`${page.metaData.title}${siteSettings.pageTitleSuffix}`}
			description={page.metaData.description}
			locale={locale}
			url={page.url}
		/>

		<Page
			showBackLink="result"
			title={page.title}
			illustrationUrl="/images/Illustratie_We_helpen_je_op_weg_sidebar.svg"
			illustrationMobileUrl="/images/Illustratie_Mobiel_We_helpen_je_op_weg_sidebar.svg"
		>
			<Content>
				<p
					sx={{
						marginBottom: '35px',
						marginTop: 0,
						fontSize: 'smallText',
						color: '#6A6A6A',
						'::before': {
							content: '""',
							backgroundImage: 'url("/icons/Union.svg")',
							backgroundSize: '30px 30px',
							marginTop: '-5px',
							marginRight: '10px',
							float: 'left',
							height: '30px',
							width: '30px',
						},
					}}
				>
					{page.saveCopy}
				</p>
				{documents.map((document) => (
					<PreparationPanel
						image={document.image}
						text={document.title}
						key={document.title}
					>
						{document.description && <p>{document.description}</p>}
						<ul>
							{document.items.map((item) => (
								<PreparationPanelListItem
									text={item.title}
									subtext={item.description}
								/>
							))}
						</ul>
					</PreparationPanel>
				))}
				<Feedback />
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
		${getLocaleProperty('saveCopy')},
		url
	}`;
	const documentsQuery = `*[_type == "voorbereiding-document"]{
		${getLocaleProperty('title')},
		${getLocaleProperty('description')},
		"image": image.asset->url,
		"items": items[]{
			${getLocaleProperty('title', 'title')},
			${getLocaleProperty('description', 'description')}
		}
	} | order(order asc)`;
	const { page, siteSettings, documents } = await sanity.fetch(
		getPageQuery({
			type: 'voorbereiding-page',
			pageProjection,
			documentsQuery,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			documents,
			locale: process.env.NEXT_PUBLIC_LOCALE,
		},
	};
};

export default VoorbereidingPage;
