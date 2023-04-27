export interface SubFolderReferenceProps {
	subFolderReference?: {
		slug: string;
		subFolderReference?: {
			slug: string;
			subFolderReference?: {
				slug: string;
				subFolderReference?: {
					slug: string;
				};
			};
		};
	};
}

export const subFolderReferenceQuery = (): string => {
	return `subFolderReference->{
		"slug": slug.current,
		subFolderReference->{
			"slug": slug.current,
			subFolderReference->{
				"slug": slug.current,
				subFolderReference->{
					"slug": slug.current,
				},
			},
		},
	}`;
};
