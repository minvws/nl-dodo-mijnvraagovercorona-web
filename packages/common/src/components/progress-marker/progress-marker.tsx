/** @jsxImportSource theme-ui */
import React from 'react';
import { jsx } from 'theme-ui';

import { NavLink } from '@quarantaine/common';

type ProgressMarkerProps = {
	currentStage: number;
	currentStageLabel: string;
	stageLinks: string[];
};

export const ProgressMarker = ({
	currentStage,
	stageLinks,
	currentStageLabel,
}: ProgressMarkerProps) => {
	return (
		<ol
			sx={{
				paddingTop: 0,
				marginTop: 0,
				paddingLeft: 0,
				paddingBottom: '16px',
				fontSize: '16px',
				fontWeight: 'bold',
			}}
			tabIndex={0}
			role="progressbar"
			aria-valuemin={1}
			aria-valuemax={stageLinks.length + 1}
			aria-valuenow={currentStage}
			aria-valuetext={currentStageLabel}
		>
			{stageLinks.map((stageLink, index) => {
				const stageNumber = index + 1;
				const isCurrentStage = stageNumber === currentStage;
				const isPastStage = stageNumber < currentStage;
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
								textDecoration: 'none',
							},

							'&:last-child': {
								marginRight: 0,
							},
						}}
						key={stageNumber}
					>
						{isPastStage ? (
							<NavLink
								href={stageLink}
								sx={{ textDecoration: 'none', cursor: 'pointer' }}
							>
								{stageNumber}
							</NavLink>
						) : (
							<>{stageNumber}</>
						)}
					</li>
				);
			})}
		</ol>
	);
};
