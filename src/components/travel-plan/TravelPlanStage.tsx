/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { formatShortDate } from '../../utilities/dateUtils';

type TravelPlanStageProps = {
	title: string;
	subHeading?: string;
	date?: Date;
	children?: React.ReactNode;
};

export const TravelPlanStage = ({
	title,
	subHeading,
	date,
	children,
}: TravelPlanStageProps) => {
	return (
		<>
			<div
				sx={{
					marginBottom: '1em',
					color: 'header',
					position: 'relative',
					// Make step title lowercase if it is prepended with a date.
					'span + span': {
						textTransform: 'lowercase',
					},
					'::before': {
						content: '""',
						display: 'block',
						width: 22,
						height: 22,
						borderRadius: 22,
						backgroundColor: '#F6D4E3',
						position: 'absolute',
						left: -40,
						top: 0,
					},
				}}
			>
				<h3
					sx={{
						display: 'inline-block',
						fontSize: ['bodyMobile', 'body'],
						color: 'text',
						marginBottom: 0,
						marginTop: 0,
						lineHeight: 1,
					}}
				>
					{date && (
						<span
							sx={{
								color: 'smallText',
							}}
						>
							{`${formatShortDate(date)}: `}
						</span>
					)}
					<span>{title}</span>
				</h3>
				{subHeading && (
					<h4
						sx={{
							fontWeight: 'normal',
							fontSize: ['bodyMobile', 'body'],
							marginTop: 0,
							marginBottom: '9px',
							color: 'text',
						}}
					>
						{subHeading}
					</h4>
				)}
			</div>
			{children}
		</>
	);
};
