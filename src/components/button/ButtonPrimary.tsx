/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { Link } from 'components/link';
import { ButtonStyled } from './ButtonStyled';

interface ButtonPrimaryProps {
	href: string | Object;
	external?: boolean;
	children: React.ReactNode;
}

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
	href,
	external,
	children,
}) => {
	if (external && typeof href === 'string')
		return (
			<a href={href} target="_blank" rel="noopener noreferrer">
				<ButtonStyled>{children}</ButtonStyled>
			</a>
		);

	return (
		<Link href={href} passHref>
			<a>
				<ButtonStyled>{children}</ButtonStyled>
			</a>
		</Link>
	);
};
