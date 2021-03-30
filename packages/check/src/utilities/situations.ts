import { sanityClient, getPageQuery } from '@quarantaine/common';

export const getSituations = async () => {
	const pageProjection: string = `{
		situationsYou[]{
			"ctas": ctas[].name
		},
		situationsOther[]{
			"ctas": ctas[].name
		},
	}`;
	const { page } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'jouw-situatie-page',
			pageProjection,
			locale: 'nl',
		}),
	);

	return Object.keys(page).reduce(
		(results: Array<string>, key: string) => [
			...results,
			...page[key].reduce(
				(items: Array<string>, item: { ctas?: Array<string> }) => [
					...items,
					...(item.ctas ? item.ctas : []),
				],
				[],
			),
		],
		[],
	);
};
