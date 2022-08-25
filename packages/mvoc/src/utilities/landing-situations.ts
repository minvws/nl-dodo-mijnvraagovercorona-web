import { getClient, siteSettingsQuery, Locales } from '@quarantaine/common';

export const getLandingSituations = async () => {
	const questions = await getClient(false).fetch(
		`*[_type=="landing-situations-document"]{"landingSituation": slug.current}`,
	);

	return questions;
};

export const getLandingSituationPageQuery = ({
	pageProjection,
	locale,
	landingSituation,
}: {
	pageProjection: string;
	locale: Locales;
	landingSituation: string;
}): string => `{
	"page": *[_type == "landing-situations-document" && slug.current=="${landingSituation}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({
		locale,
		site: 'mijn-vraag-over-corona',
	})},
}`;
