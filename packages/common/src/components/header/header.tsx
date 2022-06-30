/** @jsx jsx */
import React from 'react';
import { Box, Container, jsx } from 'theme-ui';

import {
	Logo,
	useSanitySiteSettings,
	LocaleSelector,
} from '@quarantaine/common';

interface HeaderProps {
	transparent?: boolean;
	noPadding?: boolean;
	linkBackSlot?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
	transparent,
	noPadding,
	children,
	linkBackSlot,
}) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<header
			sx={{
				position: 'relative',
				backgroundColor: transparent ? 'transparent' : 'headerBackground',
				color: 'header',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right top',
				...(noPadding ? {} : { paddingBlockEnd: '1.75rem' }),
			}}
		>
			{linkBackSlot ? (
				<Box
					sx={{
						position: 'absolute',
						insetBlockStart: ['1.75rem', '2.5rem'],
						insetInlineStart: ['1rem', '2rem'],
						'&& > *': {
							position: 'static',
						},
					}}
				>
					{linkBackSlot}
				</Box>
			) : null}
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
