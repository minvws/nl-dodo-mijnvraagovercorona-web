/** @jsx jsx */
import { InternalLink } from 'components/Links';
import { Link } from 'components/link';
import React from 'react';
import { jsx } from 'theme-ui';

type ProgressMarkerProps = {
	stage: number;
	totalStages: number;
};

const ProgressMarker = (props: ProgressMarkerProps) => {
	const rangeArr = [...Array(props.totalStages).keys()];
	return (
		<ul
			sx={{
				position: 'absolute',
				top: ['40px', '70px'],
				paddingTop: 0,
				marginTop: 0,
				paddingLeft: 0,
				fontSize: '16px',
				fontWeight: 'bold',
			}}
		>
			{rangeArr.map((index) => {
				const stageNumber = index + 1;
				const isCurrentStage = stageNumber === props.stage;
				const isPastStage = stageNumber < props.stage;
				let background = 'white';

				if (isCurrentStage) {
					background = 'button';
				}
				if (isPastStage) {
					background = '#AEC1D1';
				}

				return (
					<li
						sx={{
							display: 'inline-block',
							backgroundColor: background,
							color: isCurrentStage ? 'white' : 'header',
							borderRadius: '50%',
							width: '35px',
							height: '34px',
							padding: '8px',
							textAlign: 'center',
							marginRight: '25px',
							position: 'relative',
							'::before': {
								content: '""',
								display: stageNumber !== 1 ? 'block' : 'none',
								width: '25px',
								height: '4px',
								backgroundColor:
									isPastStage || isCurrentStage ? 'stepElement' : 'white',
								left: '-25px',
								top: '50%',
								transform: 'translateY(-2px)',
								position: 'absolute',
							},
							a: {
								color: isCurrentStage ? 'white' : 'header',
							},
						}}
						key={stageNumber}
					>
						{stageNumber === 1 ? (
							<Link href="/bestemming">
								<a sx={{ textDecoration: 'none', cursor: 'pointer' }}>
									{stageNumber}
								</a>
							</Link>
						) : (
							<>{stageNumber}</>
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default ProgressMarker;
