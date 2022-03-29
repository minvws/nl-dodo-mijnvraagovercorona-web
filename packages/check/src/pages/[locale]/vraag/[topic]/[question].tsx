import {
	getQuestionPageQuery,
	getQuestions,
	getTopics,
} from 'utilities/topics';
import { locales } from 'content/general-content';
import { cartesianProduct, sanityClient, Locales } from '@quarantaine/common';

interface VraagProps {
	page: {};
}

export const Vraag = ({ page }: VraagProps) => {
	console.log(page);
	return <div>Vraag?</div>;
};

export const getStaticPaths = async () => {
	const topics = await getTopics();
	const questions = await getQuestions();

	return {
		paths: cartesianProduct(topics, questions, locales).map(
			([topic, question, locale]: string[]) => ({
				params: { topic, question, locale },
			}),
		),

		fallback: false,
	};
};

interface VraagStaticProps {
	params: { question: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { question, locale },
}: VraagStaticProps) => {
	const pageProjection = '{...}';
	const { page, siteSettings } = await sanityClient.fetch(
		getQuestionPageQuery({
			pageProjection,
			locale,
			question,
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

export default Vraag;
