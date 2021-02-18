/** @jsx jsx */
import React from 'react';
import { Link } from 'components/link';

import { jsx } from 'theme-ui';

type TravelInformationLinkProps = {
	href: string;
	text: string;
	internal?: boolean;
	symbolFile?: string;
};

const LinkWrapper = ({
	internal,
	href,
	children,
}: {
	internal?: boolean;
	href: string;
	children: React.ReactNode;
}) => (internal ? <Link href={href}>{children}</Link> : <>{children}</>);

export const TravelInformationLink = (props: TravelInformationLinkProps) => {
	const symbolFile = props.symbolFile
		? props.symbolFile
		: '/icons/Vector-1.svg';

	return (
		<LinkWrapper href={props.href} internal={props.internal}>
			<a
				href={props.href}
				{...(!props.internal
					? {
							target: '_blank',
							rel: 'noopener noreferrer',
					  }
					: {})}
				sx={{
					color: 'text',
					'::after': !props.internal
						? {
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
						  }
						: {},
				}}
			>
				{props.text}
			</a>
		</LinkWrapper>
	);
};
