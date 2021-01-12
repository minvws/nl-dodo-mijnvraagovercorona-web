/** @jsx jsx */
import React from 'react';
import Link from 'next/link';
import { jsx } from 'theme-ui';

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
}) =>
	external && typeof href === 'string' ? (
		<a href={href} target="_blank" rel="noopener noreferrer">
			<ButtonStyled>{children}</ButtonStyled>
		</a>
	) : (
		<Link href={href} passHref>
			<a>
				<ButtonStyled>{children}</ButtonStyled>
			</a>
		</Link>
	);
