import S from '@sanity/desk-tool/structure-builder';
import React, { useEffect, useState } from 'react';

import { DocumentJsonPreview } from './views/DocumentJsonPreview';
import { WebPreview } from './views/WebPreview';
import { Mercator } from '@visx/geo';

const MapPreview = () => {
	const [countries, setCountries] = useState([]);
	const [geojson, setGeojson] = useState();
	const width = 1000;
	const height = 1000;

	const statusToColorMapping = {
		X: 'green',
		Y: 'yellow',
		Z: 'orange',
		ZV: 'red',
	};

	useEffect(() => {
		const query = encodeURIComponent(
			'*[_type == "land-document"]{ slug, "nameNl": name.nl, "nameEn": name.en, "riskCategory": riskCategory->label, synonyms, coronamelder, formerFlyRestriction}',
		);

		fetch(
			'https://6h7384ur.api.sanity.io/v1/data/query/production?query=' + query,
		)
			.then((res) => res.json())
			.then((res) => {
				setCountries(res.result);
			});

		fetch('/static/world.geojson.json')
			.then((res) => res.json())
			.then((res) => setGeojson(res));
	}, []);
	console.log(geojson);
	if (!geojson) return 'loading....';

	return (
		<>
			<svg width={width} height={height}>
				<rect x={0} y={0} width={width} height={height} fill="#fff" rx={14} />
				<Mercator<any>
					data={geojson.features}
					scale={120}
					translate={[width / 2, height / 2]}
				>
					{(mercator) => (
						<g>
							{mercator.features.map(({ feature, path }, i) => {
								const country = countries.find(
									(c) =>
										c.nameEn === feature.properties.name ||
										c.nameEn.startsWith(feature.properties.name),
								);
								const color = country?.riskCategory
									? statusToColorMapping[country.riskCategory]
									: '#ccc';
								console.log(country, feature.properties.name, feature);
								return (
									<path
										key={`map-feature-${i}`}
										d={path || ''}
										fill={color}
										stroke="#333"
										strokeWidth={0.5}
									/>
								);
							})}
						</g>
					)}
				</Mercator>
			</svg>
		</>
	);
};

export const getViews = (type: 'page' | 'document') => [
	S.view.form(),
	S.view.component(DocumentJsonPreview).title('JSON'),
	type === 'page' && S.view.component(WebPreview).title('Web'),
	S.view.component(MapPreview).title('Risico-kaart'),
];
