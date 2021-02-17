/** @jsx jsx */
import { jsx } from 'theme-ui';
import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';

import Feedback from 'components/feedback/Feedback';
import MetaTags from 'components/meta/MetaTags';
import PreparationPanel from 'components/preparations/PreparationPanel';
import PreparationPanelListItem from 'components/preparations/PreparationPanelListItem';
import { Content, Page } from 'components/structure/Page';
import { useSanityPageContent } from 'hooks/translation';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	title: string;
	saveCopy: string;
	url: string;
}

interface VoorbereidingProps {
	documents: {
		title: string;
		image: string;
		description: string;
		items: {
			title: string;
			description?: string;
		}[];
	}[];
}

const VoorbereidingPage = ({ documents }: VoorbereidingProps) => {
	const page = useSanityPageContent<PageContent>();
	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
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
										key={item.title}
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
};

export const getStaticProps = async ({
	params: { locale },
}: {
	params: { locale: 'nl' | 'en' };
}) => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		${getLocaleProperty({ name: 'title', locale })},
		${getLocaleProperty({ name: 'saveCopy', locale })},
		url
	}`;
	const documentsQuery = `*[_type == "voorbereiding-document"]{
		${getLocaleProperty({ name: 'title', locale })},
		${getLocaleProperty({ name: 'description', locale })},
		"image": image.asset->url,
		"items": items[]{
			${getLocaleProperty({ name: 'title', locale })},
			${getLocaleProperty({ name: 'description', locale })},
		}
	} | order(order asc)`;
	const { page, siteSettings, documents } = await sanity.fetch(
		getPageQuery({
			type: 'voorbereiding-page',
			pageProjection,
			documentsQuery,
			locale,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			documents,
			locale,
		},
	};
};

export const getStaticPaths = () => ({
	paths: ['nl', 'en'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});

export default VoorbereidingPage;
