/** @jsx jsx */
import React from 'react';
import Link from 'next/link';
import { jsx } from 'theme-ui';

import { ButtonStyled } from './ButtonStyled';
import { useCurrentLanguage } from 'hooks/translation';

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
	const currentLanguage = useCurrentLanguage();

	if (external && typeof href === 'string')
		return (
			<a href={href} target="_blank" rel="noopener noreferrer">
				<ButtonStyled>{children}</ButtonStyled>
			</a>
		);

	return (
		<Link href={`${currentLanguage.urlPrefix}${href}`} passHref>
			<a>
				<ButtonStyled>{children}</ButtonStyled>
			</a>
		</Link>
	);
};
