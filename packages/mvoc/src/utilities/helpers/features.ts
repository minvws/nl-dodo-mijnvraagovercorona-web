export interface FeatureProps {
	type: 'feature';
	element: HTMLLIElement;
	markerElement: HTMLDivElement;
	geometry: {
		coordinates: [number, number];
	};
	properties: {
		slug: string;
		ggdData: {
			name: string;
			slug: string;
		};
		location: {
			address: string;
			city: string;
			coordinates: string;
			zipcode: string;
		};
		name: string;
		openingHours: {
			scheme: {
				[key in
					| 'monday'
					| 'tuesday'
					| 'wednesday'
					| 'thursday'
					| 'friday'
					| 'saturday'
					| 'sunday']: {
					start: string;
					end: string;
				}[];
			};
			overrides: {
				date: string;
				openingHours?: {
					start: string;
					end: string;
				}[];
			}[];
		};
		show: {
			start?: string;
			end?: string;
		};
		vaccinationSeries: 'b' | 'b1' | 'bb1';
	};
}

export interface FeaturesProps {
	type: 'FeatureCollection';
	features: FeatureProps[];
}
