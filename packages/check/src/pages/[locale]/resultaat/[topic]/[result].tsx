import { getResultPageQuery, getResults, getTopics } from 'utilities/topics';
import { locales } from 'content/general-content';
import { cartesianProduct, sanityClient, Locales } from '@quarantaine/common';

interface ResultaatProps {
	page: {};
}

export const Resultaat = ({ page }: ResultaatProps) => {
	console.log(page);
	return <div>Resultaat!</div>;
};

export const getStaticPaths = async () => {
	const topics = await getTopics();
	const results = await getResults();

	return {
		paths: cartesianProduct(topics, results, locales).map(
			([topic, result, locale]: string[]) => ({
				params: { topic, result, locale },
			}),
		),

		fallback: false,
	};
};

interface ResultaatStaticProps {
	params: { result: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { result, locale },
}: ResultaatStaticProps) => {
	const pageProjection = '{...}';
	const { page, siteSettings } = await sanityClient.fetch(
		getResultPageQuery({
			pageProjection,
			locale,
			result,
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

export default Resultaat;
