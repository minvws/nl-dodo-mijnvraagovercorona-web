import { sanityClient } from '@quarantaine/common';

export const getSituations = async () => {
	const { page } = await sanityClient.fetch<{
		page: { _type: string; url: string; maxDays: number }[];
	}>(`{
    "page": *[_type match "$situatie-" && metaData.site == "quarantaine-check"]{
      _type,
      url,
      maxDays,
    },
  }`);

	return (
		page
			// Remove any pages without a url
			.filter((p) => p.url)
			// Remove any page types NOT starting with situatie-
			.filter((p) => p._type.startsWith('situatie-'))
	);
};
