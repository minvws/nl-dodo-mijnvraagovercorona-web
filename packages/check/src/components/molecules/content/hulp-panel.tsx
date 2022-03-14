/** @jsx jsx */
import React from 'react';
import { jsx, Box, Styled } from 'theme-ui';

import type { PageContent } from 'pages/[locale]/index';
import { Stack, useSanityPageContent } from '@quarantaine/common';

export const HulpPanel = () => {
	const page = useSanityPageContent<PageContent>();

	return (
		<Stack
			styles={{
				display: 'flex',
				flexDirection: 'column',
				maxInlineSize: '17.5rem',
				marginInlineStart: 'auto',
				marginInlineEnd: 'auto',
				alignItems: 'center',
				textAlign: 'center',
			}}
		>
			<Styled.h2
				sx={{
					fontSize: ['h1Mobile', 'h1'],
				}}
			>
				{page.help.title}
			</Styled.h2>
			<Styled.p
				sx={{
					fontSize: ['h2Mobile', 'h2'],
					fontWeight: 'bold',
					color: 'header',
				}}
			>
				{page.help.question}
			</Styled.p>
			<Box
				sx={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}
			>
				<img src="/icons/phone.svg" />
				<Styled.a
					sx={{
						color: 'secondary',
						fontWeight: 'bold',
						textDecoration: 'none',
						fontSize: '2rem',
						margin: 0,
						padding: 0,
					}}
					href="tel:08007707707"
				>
					0800-7707707
				</Styled.a>
			</Box>
			<Styled.p>{page.help.openingHours}</Styled.p>
		</Stack>
	);
};
