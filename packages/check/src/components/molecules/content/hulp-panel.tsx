/** @jsx jsx */
import React from 'react';
import { jsx, Box, Styled } from 'theme-ui';

import type { PageContent } from 'pages/[locale]/index';
import { useSanityPageContent } from '@quarantaine/common';

export const HulpPanel = () => {
	const page = useSanityPageContent<PageContent>();

	return (
		<Box
			sx={{
				flexDirection: 'column',
				display: 'flex',
				alignItems: 'center',
				padding: 14,
			}}
		>
			<Styled.h2>{page.help.title}</Styled.h2>
			<Styled.p
				sx={{
					color: 'header',
					fontWeight: 'bold',
					fontSize: 20,
					textAlign: 'center',
				}}
			>
				{page.help.question}
			</Styled.p>
			<Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
				<img src="/icons/phone.svg" />
				<Styled.a
					sx={{
						color: 'secondary',
						fontWeight: 'bold',
						textDecoration: 'none',
						fontSize: 32,
						margin: 0,
						padding: 0,
					}}
					href="tel:08007707707"
				>
					0800-7707707
				</Styled.a>
			</Box>
			<Styled.p sx={{ textAlign: 'center' }}>{page.help.openingHours}</Styled.p>
		</Box>
	);
};
