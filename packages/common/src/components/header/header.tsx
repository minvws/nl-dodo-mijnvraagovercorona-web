/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';

import {
	Logo,
	useSanitySiteSettings,
	LocaleSelector,
} from '@quarantaine/common';

interface HeaderProps {
	transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent, children }) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<header
			sx={{
				backgroundColor: transparent ? 'transparent' : 'headerBackground',
				color: 'header',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right top',
				paddingBottom: '28px',
			}}
		>
			<LocaleSelector />
			<Logo alt={siteSettings.header.logoAlt} />
			{children && (
				<Container sx={{ paddingX: ['mobilePadding', , 0] }}>
					{children}
				</Container>
			)}
		</header>
	);
};
