/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

import {
	useSanitySiteSettings,
	StyledLink,
	useCurrentLocale,
} from '@quarantaine/common';
import { useRouter } from 'next/router';

interface OwnProps {}

export const skipLinkID = 'main';

export const SkipLink: React.FC<OwnProps> = ({}) => {
	const siteSettings = useSanitySiteSettings();
	const { asPath } = useRouter();

	const link = `${asPath}#${skipLinkID}`;

	return (
		<Box
			sx={{
				position: 'absolute',
				insetBlockStart: '2rem',
				insetInlineStart: '2rem',
				'&:not(:focus-within)': {
					clip: 'rect(0 0 0 0)',
					clipPath: 'inset(50%)',
					height: '1px',
					overflow: 'hidden',
					position: 'absolute',
					whiteSpace: 'nowrap',
					width: '1px',
				},
			}}
		>
			<StyledLink href={link} styledAs="button-tertiary">
				{siteSettings.header.skipLink}
			</StyledLink>
		</Box>
	);
};
