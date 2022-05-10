import { sanityClient, siteSettingsQuery, Locales } from '@quarantaine/common';

export const getSituationQuestions = async () => {
	const questions = await sanityClient.fetch(
		`*[_type=="situation-question-document"]{"question": slug.current, "situation": situation->slug.current}`,
	);

	return questions;
};

export const getSituationQuestionPageQuery = ({
	pageProjection,
	locale,
	question,
	situation,
}: {
	pageProjection: string;
	locale: Locales;
	question: string;
	situation: string;
}): string => `{
	"page": *[_type == "situation-question-document" && situation->slug.current == "${situation}" && slug.current=="${question}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site: 'quarantaine-check' })},
}`;

export const getSituationResults = async () => {
	const results = await sanityClient.fetch(
		`*[_type=="situation-result-document"]{"result": slug.current, "situation": situation->slug.current}`,
	);

	return results;
};

export const getSituationResultPageQuery = ({
	pageProjection,
	locale,
	result,
	situation,
}: {
	pageProjection: string;
	locale: Locales;
	result: string;
	situation: string;
}): string => `{
	"page": *[_type == "situation-result-document" && situation->slug.current == "${situation}" && slug.current=="${result}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({ locale, site: 'quarantaine-check' })},
}`;

export const getSituations = async () => {
	const situations = await sanityClient.fetch(
		`*[_type=="situation-flow-document"].slug.current`,
	);

	return situations;
};
