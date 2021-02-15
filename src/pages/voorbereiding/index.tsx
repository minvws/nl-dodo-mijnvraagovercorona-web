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
	};
	siteSettings: {
		pageTitleSuffix: string;
	};
	items: {
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
	items,
}: VoorbereidingProps) => (
	<>
		<MetaTags
			title={`${page.metaData.title}${siteSettings.pageTitleSuffix}`}
			description={page.metaData.description}
			locale={locale}
			url="/voorbereiding"
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
				{items.map((item) => (
					<PreparationPanel image={item.image} text={item.title}>
						{item.description && <p>{item.description}</p>}
						<ul>
							{item.items.map((item) => (
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
		${getLocaleProperty('saveCopy')}
	}`;
	const { page, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'voorbereiding-page',
			pageProjection,
		}),
	);
	const items = await sanity.fetch(
		`*[_type == "voorbereiding-document"]{
			${getLocaleProperty('title')},
			${getLocaleProperty('description')},
			"image": image.asset->url,
			"items": items[]{
				${getLocaleProperty('title', 'title')},
				${getLocaleProperty('description', 'description')}
			}
		} | order(order asc)`,
	);

	return {
		props: {
			page,
			siteSettings,
			items,
			locale: process.env.NEXT_PUBLIC_LOCALE,
		},
	};
};

export default VoorbereidingPage;
