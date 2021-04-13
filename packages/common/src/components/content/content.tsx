/** @jsx jsx */
import React from 'react';
import { Box, Container, Flex, jsx } from 'theme-ui';

import {
	BodyContainer,
	useSanitySiteSettings,
	BannerDataProtection,
} from '@quarantaine/common';

interface ContentProps {
	noSpacingOnTop?: boolean;
}

export const Content: React.FC<ContentProps> = ({
	children,
	noSpacingOnTop,
}) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<Container>
			<Flex
				sx={{
					flexDirection: ['column', 'row'],
				}}
			>
				<BodyContainer
					sx={{
						paddingTop: noSpacingOnTop ? 0 : '24px',
						'> :first-child': { marginTop: 0 },
					}}
				>
					{children}
				</BodyContainer>
				<Box
					id="privacy"
					as="aside"
					sx={{
						margin: ['0 0 55px 0', '55px 0 55px auto'],
						maxWidth: ['100%', '340px'],
					}}
				>
					<BodyContainer sx={{ paddingX: ['mobilePadding', , 0] }}>
						<BannerDataProtection content={siteSettings.privacy} />
					</BodyContainer>
				</Box>
			</Flex>
		</Container>
	);
};
