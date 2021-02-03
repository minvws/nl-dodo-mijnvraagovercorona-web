/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';

type TravelAdvicePanelProps = {
	title: string;
	subHeading?: string;
	children: React.ReactNode;
};

const TravelAdvicePanel = ({
	title,
	subHeading,
	children,
}: TravelAdvicePanelProps) => (
	<Container
		sx={{
			marginTop: '-0.5em',
			paddingBottom: '0.9em',
		}}
	>
		<div
			sx={{
				color: 'black',
				border: '1px solid #CA005D',
				borderRadius: '10px',
				paddingLeft: '0.5em',
				paddingRight: '0.5em',
			}}
		>
			<div
				sx={{
					display: 'flex',
					paddingTop: '0.5em',
					justifyContent: 'space-between',
					flexDirection: ['column', 'row'],
				}}
			>
				<h4
					sx={{
						margin: 0,
						padding: 0,
					}}
				>
					{title}
				</h4>
				{subHeading && (
					<h5
						sx={{
							color: 'gray', // todo
							margin: 0,
							padding: 0,
							fontSize: '12pt',
							fontWeight: 'normal',
						}}
					>
						{subHeading}
					</h5>
				)}
			</div>
			<Container
				sx={{
					marginTop: '2px',
					paddingTop: '0.2em',
					paddingBottom: '0.5em',
				}}
			>
				{children}
			</Container>
		</div>
	</Container>
);

export default TravelAdvicePanel;
