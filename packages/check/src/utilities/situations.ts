import { sanityClient } from '@quarantaine/common';

export const getSituations = async () => {
	const { page } = await sanityClient.fetch<{
		page: {
			_type: string;
			url: string;
			maxDays: number;
			showProtected: boolean;
			showDate: boolean;
		}[];
	}>(`{
    "page": *[_type=="situation-document" && metaData.site == "quarantaine-check"]{
      _type,
      _id,
      url,
      maxDays,
      showProtected,
      showDate
    },
  }`);

	return (
		page
			// Remove any pages without a url
			.filter((p) => p.url)
	);
};
