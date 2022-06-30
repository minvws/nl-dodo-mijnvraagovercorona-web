import { sanityClient, siteSettingsQuery, Locales } from '@quarantaine/common';

export const getSituationQuestions = async () => {
	const questions = await sanityClient.fetch(
		`*[_type=="situation-question-document"]{"question": slug.current}`,
	);

	return questions;
};

export const getSituationQuestionPageQuery = ({
	pageProjection,
	locale,
	question,
}: {
	pageProjection: string;
	locale: Locales;
	question: string;
}): string => `{
	"page": *[_type == "situation-question-document" && slug.current=="${question}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({
		locale,
		site: 'mijn-vraag-over-corona',
	})},
}`;

export const getSituationAdvice = async () => {
	const advice = await sanityClient.fetch(
		`*[_type=="situation-result-document"]{"advice": slug.current}`,
	);

	return advice;
};

export const getSituationAdvicePageQuery = ({
	pageProjection,
	locale,
	advice,
}: {
	pageProjection: string;
	locale: Locales;
	advice: string;
}): string => `{
	"page": *[_type == "situation-result-document" && slug.current=="${advice}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({
		locale,
		site: 'mijn-vraag-over-corona',
	})},
}`;
