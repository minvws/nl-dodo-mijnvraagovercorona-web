/** @jsx jsx */
import { jsx } from 'theme-ui';
import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';

import CopySection from 'components/home/CopySection';
import HomePageNavigation from 'components/home/HomePageNavigation';
import StartCheckButton from 'components/home/StartCheckButton';
import MetaTags from 'components/meta/MetaTags';
import { Content, Hero, Page } from 'components/structure/Page';

interface LandingProps {
	page: {
		metaData: {
			title: string;
			description: string;
		};
		header: {
			button: string;
			pretitle: string;
			subtitle: string;
			title: string;
		};
		uitleg: {
			description: string;
			image: string;
			pretitle: string;
			title: string;
			linklist: {
				id: string;
				usp: string;
			};
		}[];
		url: string;
	};
	siteSettings: {
		pageTitleSuffix: string;
	};
	locale: 'nl' | 'en';
}

const Landing = ({ page, siteSettings, locale }: LandingProps) => (
	<>
		<MetaTags
			title={page.metaData.title}
			description={page.metaData.description}
			url={page.url}
			locale={locale}
		/>

		<Page title={page.header.title} headerPrefix={page.header.pretitle}>
			<Hero>
				<h2
					sx={{
						fontWeight: 'light',
						width: ['80%', '549px'],
						fontSize: '26px',
						lineHeight: ['30px', '36px'],
						marginTop: 0,
						marginBottom: ['18px'],
						color: 'roHighlight',
					}}
				>
					{page.header.subtitle}
				</h2>
				<StartCheckButton>{page.header.button}</StartCheckButton>
			</Hero>
			<Content>
				<HomePageNavigation uitleg={page.uitleg} />
				<CopySection uitleg={page.uitleg} />
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
		"header": {
			${getLocaleProperty('button', 'header.button')},
			${getLocaleProperty('pretitle', 'header.pretitle')},
			${getLocaleProperty('subtitle', 'header.subtitle')},
			${getLocaleProperty('title', 'header.title')},
		},
		"uitleg": uitleg[]{
			"image": image.asset->url,
			${getLocaleProperty('description')},
			${getLocaleProperty('pretitle')},
			${getLocaleProperty('title')},
			"linklist": {
				${getLocaleProperty('id', 'linklist.id')},
				${getLocaleProperty('usp', 'linklist.usp')},
			},
		},
	}`;
	const { page, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'landing-page',
			pageProjection,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			content: {
				...page,
				...siteSettings,
			},
			locale: process.env.NEXT_PUBLIC_LOCALE,
		},
	};
};

export default Landing;
