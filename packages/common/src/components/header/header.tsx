/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Container, jsx } from 'theme-ui';

import {
	Logo,
	useSanitySiteSettings,
	LocaleSelector,
	SkipLink,
} from '@quarantaine/common';

export interface HeaderProps {
	variant?: 'default' | 'highlight';
	noPadding?: boolean;
	linkBackSlot?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
	variant,
	noPadding,
	children,
	linkBackSlot,
}) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<header
			sx={{
				position: 'relative',
				backgroundColor:
					variant === 'highlight'
						? 'headerBackgroundHighlight'
						: 'headerBackground',
				color: 'header',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right top',
				...(noPadding ? {} : { paddingBlockEnd: '1.75rem' }),
			}}
		>
			<SkipLink />
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
			<Logo alt={siteSettings.header.logoAlt} />
			<LocaleSelector />
			{children && (
				<Container sx={{ paddingX: ['mobilePadding', , 0] }}>
					{children}
				</Container>
			)}
		</header>
	);
};
