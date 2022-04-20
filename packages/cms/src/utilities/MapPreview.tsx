import React, { useEffect, useState } from 'react';
import { Mercator } from '@visx/geo';
import { Zoom } from '@visx/zoom';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import * as topojson from 'topojson-client';

type RiskLevels = 'X' | 'Y' | 'Z' | 'ZV';

const statusToColorMapping: { [key in RiskLevels]: string } = {
	X: '#39870C',
	Y: '#F9E11E',
	Z: '#E17000',
	ZV: '#D52B1E',
};

interface TooltipData {
	nameNl: string;
	riskLevel: RiskLevels;
	riskColor: string;
	regions: {
		nameNl: string;
		riskLevel: RiskLevels;
		riskColor: string;
	}[];
}

const RiskCircle = ({ color }: { color: string }) => (
	<span
		style={{
			display: 'inline-block',
			width: 10,
			height: 10,
			border: '1px solid #111',
			borderRadius: 10,
			backgroundColor: color,
		}}
	/>
);

export const MapPreview = () => {
	const [geojson, setGeojson] = useState<GeoJSON.FeatureCollection>();
	const width = 1000;
	const height = 1000;

	const {
		tooltipData,
		tooltipLeft,
		tooltipTop,
		tooltipOpen,
		showTooltip,
		hideTooltip,
	} = useTooltip<TooltipData>();

	const { containerRef, TooltipInPortal } = useTooltipInPortal({
		detectBounds: true,
		scroll: true,
	});

	const handleMouseOver = (
		event: React.MouseEvent<SVGPathElement>,
		datum: TooltipData,
	) => {
		// @ts-ignore
		const coords = localPoint(event.target.ownerSVGElement, event);
		if (!coords) return;
		showTooltip({
			tooltipLeft: coords.x,
			tooltipTop: coords.y,
			tooltipData: datum,
		});
	};

	useEffect(() => {
		const query = encodeURIComponent(
			'*[_type == "land-document"]{ slug, "nameNl": name.nl, "nameEn": name.en, "riskCategory": riskCategory->label, synonyms, coronamelder, formerFlyRestriction}',
		);

		fetch(
			'https://yiy91tbc.api.sanity.io/v1/data/query/production?query=' + query,
		)
			.then((res) => res.json())
			.then((res) => {
				const countries = res.result as {
					riskCategory: RiskLevels;
					nameNl: string;
					nameEn: string;
				}[];

				fetch('/static/world.topojson.json')
					.then((res) => res.json())
					.then((res) => {
						const world = topojson.feature(res, res.objects.world);
						// @ts-ignore
						world.features = world.features.map((feature) => {
							// Countries with multiple risk levels will show the color
							// of the highest risk — therefore we sort the countries by risk here.
							// If this starts happening more often we maybe want to create
							// a gradient for this?
							const matchingCountries = countries
								.filter((c) => c.nameEn.startsWith(feature.properties.name))
								.sort((a, b) => (a.riskCategory < b.riskCategory ? 1 : -1));

							let riskLevel;
							let riskColor;
							let nameNl;

							if (!matchingCountries.length) return feature;

							if (matchingCountries.length === 1) {
								riskLevel = matchingCountries[0].riskCategory;
								riskColor =
									statusToColorMapping[matchingCountries[0].riskCategory];
								nameNl = matchingCountries[0].nameNl;
							} else {
								const highestRiskCountry = matchingCountries[0];
								riskLevel = highestRiskCountry.riskCategory;
								riskColor =
									statusToColorMapping[highestRiskCountry.riskCategory];
								nameNl = matchingCountries[0].nameNl.split('(')[0];
							}

							return {
								...feature,
								properties: {
									...feature.properties,
									riskLevel,
									riskColor,
									nameNl,
									regions:
										matchingCountries.length === 1
											? undefined
											: matchingCountries.map((country) => ({
													nameNl: country.nameNl,
													riskLevel: country.riskCategory,
													riskColor: statusToColorMapping[country.riskCategory],
											  })),
								},
							};
						});

						// @ts-ignore
						setGeojson(world);
					});
			});
	}, []);

	if (!geojson) return 'loading....';

	return (
		<Zoom
			width={width}
			height={height}
			scaleXMin={100}
			scaleXMax={1000}
			scaleYMin={100}
			scaleYMax={1000}
			transformMatrix={{
				scaleX: 120,
				scaleY: 120,
				translateX: width / 2,
				translateY: height / 2,
				skewX: 0,
				skewY: 0,
			}}
		>
			{(zoom) => (
				<svg
					ref={containerRef}
					width={width}
					height={height}
					onTouchStart={zoom.dragStart}
					onTouchMove={zoom.dragMove}
					onTouchEnd={zoom.dragEnd}
					onMouseDown={zoom.dragStart}
					onMouseMove={zoom.dragMove}
					onMouseUp={zoom.dragEnd}
					onMouseLeave={() => {
						if (zoom.isDragging) zoom.dragEnd();
					}}
				>
					<rect x={0} y={0} width={width} height={height} fill="#fff" rx={14} />
					<Mercator<any>
						data={geojson.features}
						scale={zoom.transformMatrix.scaleX}
						translate={[
							zoom.transformMatrix.translateX,
							zoom.transformMatrix.translateY,
						]}
					>
						{(mercator) => (
							<g>
								{mercator.features.map(({ feature, path }, i) => {
									return (
										<path
											key={`map-feature-${feature.properties.name}-${i}`}
											d={path || ''}
											fill={feature.properties.riskColor}
											stroke="#333"
											strokeWidth={0.5}
											onMouseOver={(ev) =>
												handleMouseOver(ev, feature.properties)
											}
											onMouseOut={hideTooltip}
										/>
									);
								})}
							</g>
						)}
					</Mercator>

					{tooltipOpen && (
						<TooltipInPortal
							// set this to random so it correctly updates with parent bounds
							key={Math.random()}
							top={tooltipTop}
							left={tooltipLeft}
						>
							{tooltipData && !tooltipData?.regions && (
								<h4>
									{tooltipData.nameNl}{' '}
									<RiskCircle color={tooltipData.riskColor} />
								</h4>
							)}
							{tooltipData &&
								tooltipData?.regions &&
								tooltipData.regions.map((region) => (
									<h4>
										{region?.nameNl} <RiskCircle color={region.riskColor} />
									</h4>
								))}
						</TooltipInPortal>
					)}
				</svg>
			)}
		</Zoom>
	);
};
