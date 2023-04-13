export interface InternalPageCollectionProps {
	internalPageCollection: {
		label: string;
		link: {
			label: string | null | { nl: string; en: string };
			slug: string;
		};
	}[];
}

export const internalPageReferenceInSelectQuery = (): string => {
	return `
		pageReference->_type == "theme-page" => pageReference->slug.current,
		pageReference->_type == "generic-page" => pageReference->slug.current,
		pageReference->_type == "locations-page" => pageReference->theme->slug.current + '/' + pageReference->slug.current,
		pageReference->_type == "tip-document" => 'tip/' + pageReference->slug.current,
	`;
};

export const internalPageReferenceQuery = (): string => {
	return `internalPageCollection[]{
		label,
		"link": select(
			defined(href) => {"slug": href},
			pageReference->_type == "theme-page" => pageReference->{
				"label": metaData.title,
				"slug": slug.current
			},
			pageReference->_type == "generic-page" => pageReference->{
				"label": metaData.title,
				"slug": slug.current,
			},
			pageReference->_type == "locations-page" => pageReference->{
				"label": metaData.title,
				"slug": pageReference->theme->slug.current + '/' + pageReference->slug.current,
			},
			pageReference->_type == "tip-document" => pageReference->{
				"label": metaData.title,
				"slug": 'tip/' + slug.current
			},
		),
	}`;
};
