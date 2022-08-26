/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

import { useSanitySiteSettings, StyledLink } from '@quarantaine/common';

interface OwnProps {}

export const skipLinkID = 'main';

export const SkipLink: React.FC<OwnProps> = ({}) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<Box
			sx={{
				position: 'absolute',
				insetBlockStart: ['1rem', '2rem'],
				insetInlineStart: ['1rem', '2rem'],
				zIndex: 4,
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
			<StyledLink href={`#${skipLinkID}`} styledAs="button-tertiary">
				{siteSettings.header.skipLink}
			</StyledLink>
		</Box>
	);
};
