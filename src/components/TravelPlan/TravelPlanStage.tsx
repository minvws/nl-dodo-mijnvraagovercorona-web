/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type TravelPlanStageProps = {
	title: string;
	subHeading?: string;
	date?: string;
	children?: React.ReactNode;
};

const TravelPlanStage = (props: TravelPlanStageProps) => {
	return (
		<>
			<div
				sx={{
					marginBottom: '1em',
					color: 'header',
				}}
			>
				<h3
					sx={{
						fontSize: ['bodyMobile', 'body'],
					}}
				>
					{props.title}
				</h3>
				<h4
					sx={{
						paddingTop: '1em',
						float: 'right',
						fontSize: ['bodyMobile', 'body'],
						textAlign: 'right',
						marginRight: '1em',
						marginTop: '-2em',
					}}
				>
					{props.date}
				</h4>
				{props.subHeading && (
					<h4
						sx={{
							fontWeight: 'normal',
							fontSize: ['bodyMobile', 'body'],
							marginTop: 0,
							marginBottom: '9px',
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
