/** @jsx jsx */
import { jsx } from 'theme-ui';
import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';

import CopySection from 'components/home/CopySection';
import HomePageNavigation from 'components/home/HomePageNavigation';
import StartCheckButton from 'components/home/StartCheckButton';
import MetaTags from 'components/meta/MetaTags';
import { Content, Hero, Page } from 'components/structure/Page';
import { useSanityPageContent } from 'hooks/translation';

interface PageContent {
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
}

const Landing = () => {
	const page = useSanityPageContent<PageContent>();
	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
				skipPageSuffix
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
};

interface LandingStaticProps {
	params: { locale: 'nl' | 'en' };
}

export const getStaticProps = async ({
	params: { locale },
}: LandingStaticProps) => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'button', path: 'header.button', locale })},
			${getLocaleProperty({ name: 'pretitle', path: 'header.pretitle', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
		},
		"uitleg": uitleg[]{
			"image": image.asset->url,
			${getLocaleProperty({ name: 'description', locale })},
			${getLocaleProperty({ name: 'pretitle', locale })},
			${getLocaleProperty({ name: 'title', locale })},
			"linklist": {
				${getLocaleProperty({ name: 'id', path: 'linklist.id', locale })},
				${getLocaleProperty({ name: 'usp', path: 'linklist.usp', locale })},
			},
		},
		url,
	}`;

	const { page, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'landing-page',
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
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

export default Landing;
