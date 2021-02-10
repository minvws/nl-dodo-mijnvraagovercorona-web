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
				a: {
					color: 'text',
					'&[target="_blank"]::after': {
						display: 'inline-block',
						content: '""',
						backgroundImage: `url('/icons/Vector-1.svg')`,
						backgroundSize: '0.8em 0.7em',
						height: '0.7em',
						width: '0.7em',
						marginLeft: '0.3em',
						backgroundPositionY: '0.1em',
						backgroundRepeat: 'no-repeat',
						fontSize: ['chapeau'],
						lineHeight: ['chapeau'],
					},
				},
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
