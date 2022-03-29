import { sanityClient, siteSettingsQuery, Locales } from '@quarantaine/common';

export const getQuestions = async () => {
	const questions = await sanityClient.fetch(
		`*[_type=="topic-question-document"].slug.current`,
	);

	return questions;
};

export const getQuestionPageQuery = ({
	pageProjection,
	locale,
	question,
}: {
	pageProjection: string;
	locale: Locales;
	question: string;
}): string => `{
	"page": *[_type == "topic-question-document" && slug.current=="${question}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site: 'quarantaine-check' })},
}`;

export const getResults = async () => {
	const results = await sanityClient.fetch(
		`*[_type=="topic-result-document"].slug.current`,
	);

	return results;
};

export const getResultPageQuery = ({
	pageProjection,
	locale,
	result,
}: {
	pageProjection: string;
	locale: Locales;
	result: string;
}): string => `{
	"page": *[_type == "topic-result-document" && slug.current=="${result}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site: 'quarantaine-check' })},
}`;

export const getTopics = async () => {
	const topics = await sanityClient.fetch(
		`*[_type=="topic-document"].slug.current`,
	);

	return topics;
};
