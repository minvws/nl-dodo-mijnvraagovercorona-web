/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type TravelInformationLinkProps = {
	href?: string;
	text: string;
	symbolFile?: string;
};

const TravelInformationLink = (props: TravelInformationLinkProps) => {
	const symbolFile = props.symbolFile
		? props.symbolFile
		: '/icons/Vector-1.svg';
	return (
		<a
			href={props.href}
			target="_blank"
			rel="noopener noreferrer"
			sx={{
				color: 'text',
				'::after': {
					display: 'inline-block',
					content: '""',
					backgroundImage: `url("${symbolFile}")`,
					backgroundSize: '0.8em 0.7em',
					height: '0.7em',
					width: '0.7em',
					marginLeft: '0.3em',
					backgroundPositionY: '0.1em',
					backgroundRepeat: 'no-repeat',
					fontSize: ['chapeau'],
					lineHeight: ['chapeau'],
				},
			}}
		>
			{props.text}
		</a>
	);
};

export default TravelInformationLink;
