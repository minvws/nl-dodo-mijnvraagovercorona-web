import { sanityClient, siteSettingsQuery, Locales } from '@quarantaine/common';

export const getQuestions = async () => {
	const questions = await sanityClient.fetch(
		`*[_type=="topic-question-document"]{"question": slug.current, "topic": topic->slug.current}`,
	);

	return questions;
};

export const getQuestionPageQuery = ({
	pageProjection,
	locale,
	question,
	topic,
}: {
	pageProjection: string;
	locale: Locales;
	question: string;
	topic: string;
}): string => `{
	"page": *[_type == "topic-question-document" && topic->slug.current == "${topic}" && slug.current=="${question}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site: 'quarantaine-check' })},
}`;

export const getResults = async () => {
	const results = await sanityClient.fetch(
		`*[_type=="topic-result-document"]{"result": slug.current, "topic": topic->slug.current}`,
	);

	return results;
};

export const getResultPageQuery = ({
	pageProjection,
	locale,
	result,
	topic,
}: {
	pageProjection: string;
	locale: Locales;
	result: string;
	topic: string;
}): string => `{
	"page": *[_type == "topic-result-document" && topic->slug.current == "${topic}" && slug.current=="${result}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site: 'quarantaine-check' })},
}`;

export const getTopics = async () => {
	const topics = await sanityClient.fetch(
		`*[_type=="topic-document"].slug.current`,
	);

	return topics;
};
