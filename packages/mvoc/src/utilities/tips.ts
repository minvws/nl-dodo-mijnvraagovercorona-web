import {
	sanityClient,
	siteSettingsQuery,
	Locales,
	getLocaleProperty,
	SanityImageFullProps,
	getImage,
} from '@quarantaine/common';

export const getTips = async () => {
	const questions = await sanityClient.fetch(
		`*[_type=="tip-document"]{"tip": slug.current}`,
	);

	return questions;
};

export const getTipPageQuery = ({
	pageProjection,
	locale,
	tip,
}: {
	pageProjection: string;
	locale: Locales;
	tip: string;
}): string => `{
	"page": *[_type == "tip-document" && slug.current=="${tip}"][0]${pageProjection},
	"siteSettings": ${siteSettingsQuery({
		locale,
		site: 'mijn-vraag-over-corona',
	})},
}`;

export interface TipProps {
	title: string;
	icon: SanityImageFullProps;
	slug: string;
}

export interface TipCollectionProps {
	tipCollection: TipProps[];
}

export const getTipsCollection = ({
	path,
	locale,
}: {
	path?: string;
	locale: string;
}): string => {
	return `"tipCollection": ${path ? `${path}.` : ''}tipCollection[]{
		${getLocaleProperty({
			name: 'title',
			path: 'tipReference->header.title',
			locale,
		})},
		${getImage({ name: 'icon', path: 'tipReference->header.image', full: true })},
		"slug": tipReference->slug.current,
	}`;
};
