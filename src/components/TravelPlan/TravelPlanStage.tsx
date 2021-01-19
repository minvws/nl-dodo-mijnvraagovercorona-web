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

const TravelPlanStage = (props: TravelPlanStageProps) => {
	return (
		<>
			<div
				sx={{
					marginBottom: '1em',
					color: 'header',
					position: 'relative',
					// Make step title lowercase if it is prepended with a date.
					'span + h3': {
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
				{props.date && (
					<span
						sx={{
							fontSize: ['bodyMobile', 'body'],
							textAlign: 'right',
							marginRight: '8px',
							display: 'inline-block',
							color: 'smallText',
							fontWeight: 700,
							lineHeight: 1,
						}}
					>
						{formatShortDate(props.date)}:
					</span>
				)}
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
					{props.title}
				</h3>
				{props.subHeading && (
					<h4
						sx={{
							fontWeight: 'normal',
							fontSize: ['bodyMobile', 'body'],
							marginTop: 0,
							marginBottom: '9px',
							color: 'text',
						}}
					>
						{props.subHeading}
					</h4>
				)}
			</div>
			{props.children}
		</>
	);
};

export default TravelPlanStage;
